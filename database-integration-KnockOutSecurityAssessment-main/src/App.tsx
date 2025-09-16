import React, { useState } from 'react';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { getRandomQuestions, Question } from './data/questions';

type AppState = 'landing' | 'quiz' | 'results';

interface QuizResult {
  score: number;
  answers: { question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }[];
}

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult>({ score: 0, answers: [] });

  const handleStartQuiz = () => {
    const randomQuestions = getRandomQuestions(15);
    setQuestions(randomQuestions);
    setAppState('quiz');
  };

  const handleQuizComplete = (score: number, answers: QuizResult['answers']) => {
    setQuizResult({ score, answers });
    setAppState('results');
  };

  const handleRestart = () => {
    setAppState('landing');
    setQuizResult({ score: 0, answers: [] });
    setQuestions([]);
  };

  switch (appState) {
    case 'landing':
      return <Landing onStartQuiz={handleStartQuiz} />;
    case 'quiz':
      return <Quiz questions={questions} onComplete={handleQuizComplete} />;
    case 'results':
      return (
        <Results
          score={quizResult.score}
          totalQuestions={15}
          answers={quizResult.answers}
          onRestart={handleRestart}
        />
      );
    default:
      return <Landing onStartQuiz={handleStartQuiz} />;
  }
}

export default App;