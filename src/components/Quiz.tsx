import React, { useState, useEffect } from 'react';
import { Shield, Clock, CheckCircle, XCircle, SkipForward, LogOut, Award, AlertTriangle } from 'lucide-react';
import { QuizService } from '../lib/quiz';
import { securityQuestions } from '../data/questions';
import type { AuthUser } from '../lib/auth';
import type { Question } from '../data/questions';

interface QuizProps {
  user: AuthUser;
  onLogout: () => void;
}

interface QuizState {
  currentQuestion: number;
  answers: Record<number, string>;
  timeRemaining: number;
  questionStartTime: number;
  attemptId: string | null;
  isSubmitting: boolean;
  showResults: boolean;
  score: number;
  passed: boolean;
  totalTime: number;
}

const Quiz: React.FC<QuizProps> = ({ user, onLogout }) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    timeRemaining: 30,
    questionStartTime: Date.now(),
    attemptId: null,
    isSubmitting: false,
    showResults: false,
    score: 0,
    passed: false,
    totalTime: 0
  });

  const [quizStartTime] = useState(Date.now());
  const [questions] = useState<Question[]>(() => {
    // Shuffle questions for each attempt
    const shuffled = [...securityQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 15); // Take first 15 questions
  });

  useEffect(() => {
    initializeQuiz();
  }, []);

  useEffect(() => {
    if (!quizState.showResults && quizState.timeRemaining > 0) {
      const timer = setInterval(() => {
        setQuizState(prev => {
          if (prev.timeRemaining <= 1) {
            // Time's up, auto-skip question
            handleSkipQuestion();
            return prev;
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizState.timeRemaining, quizState.showResults]);

  const initializeQuiz = async () => {
    try {
      const attemptId = await QuizService.startQuizAttempt(user.id, questions);
      setQuizState(prev => ({ ...prev, attemptId }));
    } catch (error) {
      console.error('Failed to start quiz:', error);
    }
  };

  const handleAnswer = async (answer: string) => {
    if (quizState.isSubmitting || quizState.showResults) return;

    const currentQ = questions[quizState.currentQuestion];
    const timeTaken = Math.floor((Date.now() - quizState.questionStartTime) / 1000);

    setQuizState(prev => ({ ...prev, isSubmitting: true }));

    try {
      if (quizState.attemptId) {
        await QuizService.submitAnswer(
          quizState.attemptId,
          currentQ.id,
          currentQ.question,
          answer,
          currentQ.correct,
          timeTaken
        );
      }

      setQuizState(prev => ({
        ...prev,
        answers: { ...prev.answers, [currentQ.id]: answer },
        isSubmitting: false
      }));

      // Move to next question or finish quiz
      setTimeout(() => {
        if (quizState.currentQuestion < questions.length - 1) {
          setQuizState(prev => ({
            ...prev,
            currentQuestion: prev.currentQuestion + 1,
            timeRemaining: 30,
            questionStartTime: Date.now()
          }));
        } else {
          finishQuiz();
        }
      }, 1000);

    } catch (error) {
      console.error('Failed to submit answer:', error);
      setQuizState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleSkipQuestion = async () => {
    if (quizState.isSubmitting || quizState.showResults) return;

    const currentQ = questions[quizState.currentQuestion];

    try {
      if (quizState.attemptId) {
        await QuizService.skipQuestion(
          quizState.attemptId,
          currentQ.id,
          currentQ.question,
          currentQ.correct
        );
      }

      // Move to next question or finish quiz
      if (quizState.currentQuestion < questions.length - 1) {
        setQuizState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          timeRemaining: 30,
          questionStartTime: Date.now()
        }));
      } else {
        finishQuiz();
      }

    } catch (error) {
      console.error('Failed to skip question:', error);
    }
  };

  const finishQuiz = async () => {
    const totalTime = Math.floor((Date.now() - quizStartTime) / 1000);

    try {
      if (quizState.attemptId) {
        const result = await QuizService.completeQuizAttempt(quizState.attemptId, totalTime);
        
        setQuizState(prev => ({
          ...prev,
          showResults: true,
          score: result.score,
          passed: result.passed,
          totalTime
        }));
      }
    } catch (error) {
      console.error('Failed to complete quiz:', error);
    }
  };

  const restartQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      answers: {},
      timeRemaining: 30,
      questionStartTime: Date.now(),
      attemptId: null,
      isSubmitting: false,
      showResults: false,
      score: 0,
      passed: false,
      totalTime: 0
    });
    initializeQuiz();
  };

  if (quizState.showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-orange-500 text-white py-4 px-8 rounded-lg mb-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8" />
                <h1 className="text-2xl font-bold">Quiz Results</h1>
              </div>
              <button
                onClick={onLogout}
                className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="max-w-2xl mx-auto">
            <div className={`bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 ${
              quizState.passed ? 'border-green-500' : 'border-red-500'
            }`}>
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  quizState.passed ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {quizState.passed ? (
                    <Award className="w-10 h-10 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-10 h-10 text-red-600" />
                  )}
                </div>
                
                <h2 className={`text-3xl font-bold mb-2 ${
                  quizState.passed ? 'text-green-600' : 'text-red-600'
                }`}>
                  {quizState.passed ? 'Congratulations!' : 'Assessment Complete'}
                </h2>
                
                <p className="text-gray-600 mb-6">
                  {quizState.passed 
                    ? 'You have successfully passed the security assessment!'
                    : 'You need to retake the assessment to pass.'
                  }
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{quizState.score}</div>
                    <div className="text-sm text-gray-600">Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{questions.length}</div>
                    <div className="text-sm text-gray-600">Total Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {Math.floor(quizState.totalTime / 60)}:{(quizState.totalTime % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-gray-600">Time Taken</div>
                  </div>
                </div>

                <div className={`text-lg font-semibold ${
                  quizState.passed ? 'text-green-600' : 'text-red-600'
                }`}>
                  {quizState.passed ? '✅ PASSED' : '❌ FAILED'}
                </div>
                
                <div className="text-sm text-gray-500 mt-2">
                  Passing score: 14/15 (93%)
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              {!quizState.passed && (
                <button
                  onClick={restartQuiz}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Retake Assessment
                </button>
              )}
              <button
                onClick={onLogout}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[quizState.currentQuestion];
  const progress = ((quizState.currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-orange-500 text-white py-4 px-8 rounded-lg mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Security Assessment</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span className="font-bold">{quizState.timeRemaining}s</span>
              </div>
              <button
                onClick={onLogout}
                className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Exit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {quizState.currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                  {currentQuestion.category.charAt(0).toUpperCase() + currentQuestion.category.slice(1)}
                </span>
                <div className={`flex items-center space-x-2 ${
                  quizState.timeRemaining <= 10 ? 'text-red-500' : 'text-gray-500'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span className="font-bold">{quizState.timeRemaining}s</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={quizState.isSubmitting}
                  className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="text-gray-800">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handleSkipQuestion}
                disabled={quizState.isSubmitting}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
              >
                <SkipForward className="w-4 h-4" />
                <span>Skip Question</span>
              </button>

              {quizState.isSubmitting && (
                <div className="flex items-center space-x-2 text-orange-500">
                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;