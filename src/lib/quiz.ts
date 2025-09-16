import { supabase } from './supabase';
import { AuthService } from './auth';
import type { QuizAttempt, QuestionResponse } from './supabase';
import type { Question } from '../data/questions';

export class QuizService {
  // Start a new quiz attempt
  static async startQuizAttempt(userId: string, questions: Question[]): Promise<string> {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: userId,
        total_questions: questions.length,
        questions_data: questions
      })
      .select()
      .single();

    if (error) throw error;

    // Log quiz start activity
    await AuthService.logActivity(userId, 'quiz_start', {
      attempt_id: data.id,
      total_questions: questions.length,
      timestamp: new Date().toISOString()
    });

    return data.id;
  }

  // Submit an answer for a question
  static async submitAnswer(
    attemptId: string,
    questionId: number,
    questionText: string,
    userAnswer: string,
    correctAnswer: string,
    timeTaken: number
  ) {
    const isCorrect = userAnswer === correctAnswer;

    const { data, error } = await supabase
      .from('question_responses')
      .insert({
        attempt_id: attemptId,
        question_id: questionId,
        question_text: questionText,
        user_answer: userAnswer,
        correct_answer: correctAnswer,
        is_correct: isCorrect,
        time_taken: timeTaken
      })
      .select()
      .single();

    if (error) throw error;

    // Get user ID from attempt
    const { data: attempt } = await supabase
      .from('quiz_attempts')
      .select('user_id')
      .eq('id', attemptId)
      .single();

    if (attempt) {
      // Log question answer activity
      await AuthService.logActivity(attempt.user_id, 'question_answer', {
        attempt_id: attemptId,
        question_id: questionId,
        is_correct: isCorrect,
        time_taken: timeTaken,
        timestamp: new Date().toISOString()
      });
    }

    return data;
  }

  // Submit a skipped question
  static async skipQuestion(
    attemptId: string,
    questionId: number,
    questionText: string,
    correctAnswer: string
  ) {
    const { data, error } = await supabase
      .from('question_responses')
      .insert({
        attempt_id: attemptId,
        question_id: questionId,
        question_text: questionText,
        user_answer: null,
        correct_answer: correctAnswer,
        is_correct: false,
        time_taken: 30 // Max time for skipped questions
      })
      .select()
      .single();

    if (error) throw error;

    // Get user ID from attempt
    const { data: attempt } = await supabase
      .from('quiz_attempts')
      .select('user_id')
      .eq('id', attemptId)
      .single();

    if (attempt) {
      // Log question skip activity
      await AuthService.logActivity(attempt.user_id, 'question_skip', {
        attempt_id: attemptId,
        question_id: questionId,
        timestamp: new Date().toISOString()
      });
    }

    return data;
  }

  // Complete quiz attempt
  static async completeQuizAttempt(attemptId: string, totalTimeTaken: number) {
    // Get all responses for this attempt to calculate score
    const { data: responses, error: responsesError } = await supabase
      .from('question_responses')
      .select('is_correct')
      .eq('attempt_id', attemptId);

    if (responsesError) throw responsesError;

    const score = responses.filter(r => r.is_correct).length;
    const passed = score >= 14; // 14 out of 15 to pass

    const { data, error } = await supabase
      .from('quiz_attempts')
      .update({
        completed_at: new Date().toISOString(),
        score,
        passed,
        time_taken: totalTimeTaken
      })
      .eq('id', attemptId)
      .select()
      .single();

    if (error) throw error;

    // Log quiz completion activity
    await AuthService.logActivity(data.user_id, 'quiz_complete', {
      attempt_id: attemptId,
      score,
      total_questions: data.total_questions,
      passed,
      time_taken: totalTimeTaken,
      timestamp: new Date().toISOString()
    });

    return data;
  }

  // Get user's quiz attempts
  static async getUserAttempts(userId: string): Promise<QuizAttempt[]> {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get quiz attempt with responses
  static async getAttemptWithResponses(attemptId: string) {
    const { data: attempt, error: attemptError } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('id', attemptId)
      .single();

    if (attemptError) throw attemptError;

    const { data: responses, error: responsesError } = await supabase
      .from('question_responses')
      .select('*')
      .eq('attempt_id', attemptId)
      .order('question_id');

    if (responsesError) throw responsesError;

    return {
      attempt,
      responses
    };
  }

  // Admin: Get all quiz attempts
  static async getAllAttempts(): Promise<QuizAttempt[]> {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select(`
        *,
        user_profiles (
          email,
          first_name,
          last_name,
          department,
          employee_id
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Admin: Get quiz statistics
  static async getQuizStatistics() {
    const { data: attempts, error } = await supabase
      .from('quiz_attempts')
      .select('score, total_questions, passed, completed_at')
      .not('completed_at', 'is', null);

    if (error) throw error;

    const totalAttempts = attempts.length;
    const passedAttempts = attempts.filter(a => a.passed).length;
    const averageScore = attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts;
    const passRate = (passedAttempts / totalAttempts) * 100;

    return {
      totalAttempts,
      passedAttempts,
      failedAttempts: totalAttempts - passedAttempts,
      averageScore: Math.round(averageScore * 100) / 100,
      passRate: Math.round(passRate * 100) / 100
    };
  }
}