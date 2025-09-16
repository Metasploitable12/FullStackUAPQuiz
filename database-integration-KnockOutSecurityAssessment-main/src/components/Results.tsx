import React from 'react';
import { Shield, Award, AlertTriangle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  answers: { question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, totalQuestions, answers, onRestart }) => {
  const passed = score >= 14;
  const percentage = Math.round((score / totalQuestions) * 100);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-orange-500 text-white py-4 px-8 rounded-lg mb-8 shadow-lg">
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-6 h-6" />
            <h1 className="text-xl font-bold">Security Awareness Month - Assessment Results</h1>
            <Shield className="w-6 h-6" />
          </div>
        </div>

        {/* Company Logo Placeholder */}
        <div className="flex justify-center mb-8">
          <img 
            src="/syncron_favicon_512px (1) copy.png" 
            alt="Syncron Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Results Summary */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center space-x-3 px-8 py-4 rounded-full mb-6 ${
            passed ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'
          }`}>
            {passed ? (
              <Award className="w-8 h-8 text-green-600" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-red-600" />
            )}
            <h2 className={`text-3xl font-bold ${passed ? 'text-green-800' : 'text-red-800'}`}>
              {passed ? 'Congratulations!' : 'Assessment Complete'}
            </h2>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-6xl font-bold text-orange-500 mb-4">{score}/{totalQuestions}</div>
            <div className="text-2xl text-gray-600 mb-2">Questions Answered Correctly</div>
            <div className="text-4xl font-semibold text-orange-600">{percentage}%</div>
          </div>

          {/* Pass/Fail Message */}
          <div className={`rounded-xl shadow-lg p-8 mb-8 ${
            passed ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
          }`}>
            {passed ? (
              <div>
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Excellent Work! 🎉
                </h3>
                <p className="text-green-700 text-lg mb-4">
                  You answered {score} out of {totalQuestions} questions correctly, which qualifies you for 
                  <strong> optional security awareness training</strong>.
                </p>
                <p className="text-green-600">
                  Your strong security awareness demonstrates your commitment to protecting our organization. 
                  You may choose to attend additional training sessions to further enhance your knowledge.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-red-800 mb-4">
                  Training Required 📚
                </h3>
                <p className="text-red-700 text-lg mb-4">
                  You answered {score} out of {totalQuestions} questions correctly. 
                  <strong> Mandatory security awareness training</strong> is now required.
                </p>
                <p className="text-red-600">
                  Don't worry! This training will help strengthen your cybersecurity knowledge and better protect 
                  our organization. You will receive an email shortly with training details and scheduling information.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Question Review</h3>
          <div className="space-y-6">
            {answers.map((answer, index) => (
              <div key={index} className="border-l-4 border-gray-200 pl-6 py-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-800 flex-1 mr-4">
                    Question {index + 1}: {answer.question}
                  </h4>
                  <div className="flex-shrink-0">
                    {answer.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className={`p-3 rounded ${
                    answer.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <span className="font-medium">Your Answer: </span>
                    <span className={answer.isCorrect ? 'text-green-800' : 'text-red-800'}>
                      {answer.userAnswer}
                    </span>
                  </div>
                  
                  {!answer.isCorrect && (
                    <div className="p-3 rounded bg-green-50 border border-green-200">
                      <span className="font-medium">Correct Answer: </span>
                      <span className="text-green-800">{answer.correctAnswer}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="text-center space-y-4">
          <button
            onClick={onRestart}
            className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Take Assessment Again</span>
          </button>
          
          <p className="text-gray-500 text-sm">
            Thank you for completing the Security Awareness Month assessment!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;