import React, { useState, useEffect } from 'react';
import { Shield, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Question } from '../data/questions';

interface QuizProps {
  questions: Question[];
  onComplete: (score: number, answers: { question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleTimeUp = () => {
    if (!isAnswered) {
      handleAnswer('');
    }
  };

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    setIsAnswered(true);
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    const answerRecord = {
      question: currentQuestion.question,
      userAnswer: answer || 'No answer (time expired)',
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect
    };

    setAnswers(prev => [...prev, answerRecord]);
    setSelectedAnswer(answer);
    setShowFeedback(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer('');
        setTimeLeft(30);
        setShowFeedback(false);
        setIsAnswered(false);
      } else {
        onComplete(score + (isCorrect ? 1 : 0), [...answers, answerRecord]);
      }
    }, 2000);
  };

  const getTimeColor = () => {
    if (timeLeft <= 5) return 'text-red-500';
    if (timeLeft <= 10) return 'text-orange-500';
    return 'text-green-500';
  };

  const getTimeBarColor = () => {
    if (timeLeft <= 5) return 'bg-red-500';
    if (timeLeft <= 10) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-orange-500 text-white py-4 px-8 rounded-lg mb-8 shadow-lg">
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-6 h-6" />
            <h1 className="text-xl font-bold">Security Awareness Month - Knockout User Assessment</h1>
            <Shield className="w-6 h-6" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              Score: {score}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Timer */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center space-x-2 ${getTimeColor()} font-bold text-2xl`}>
            <Clock className="w-6 h-6" />
            <span>{timeLeft}s</span>
          </div>
          <div className="w-32 bg-gray-200 rounded-full h-2 mx-auto mt-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${getTimeBarColor()}`}
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              
              let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";
              
              if (showFeedback) {
                if (isCorrect) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                }
              } else {
                buttonClass += isSelected 
                  ? "border-orange-500 bg-orange-50 text-orange-800" 
                  : "border-gray-200 hover:border-orange-300 hover:bg-orange-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => !showFeedback && !isAnswered && handleAnswer(option)}
                  disabled={showFeedback || isAnswered}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showFeedback && (
                      <>
                        {isCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-blue-800 font-medium">Explanation:</p>
              <p className="text-blue-700 mt-1">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;