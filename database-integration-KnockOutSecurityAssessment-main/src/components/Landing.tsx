import React from 'react';
import { Shield, Award, Clock, Users } from 'lucide-react';

interface LandingProps {
  onStartQuiz: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStartQuiz }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Security Awareness Month Banner */}
          <div className="bg-orange-500 text-white py-4 px-8 rounded-lg mb-8 shadow-lg">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Security Awareness Month 2025</h1>
              <Shield className="w-8 h-8" />
            </div>
            <p className="text-orange-100 mt-2">Knockout User Assessment</p>
          </div>
          
          {/* Company Logo Placeholder */}
          <div className="flex justify-center mb-6">
            <img 
              src="/syncron_favicon_512px (1) copy.png" 
              alt="Syncron Logo" 
              className="w-32 h-32 object-contain"
            />
          </div>
          
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Syncron's Security Assessment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Test your cybersecurity knowledge with our interactive quiz. Answer 14 or more questions correctly 
            to qualify and make Annual Security Awareness optional for you.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Timed Questions</h3>
            <p className="text-gray-600 text-sm">Makee sure you complete the assessment in one siiting, you have 30 seconds per question.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Eligibility for Opt-Out</h3>
            <p className="text-gray-600 text-sm">Answer 14+ questions correctly to be eligible  for opt-out trainings.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">15 Questions</h3>
            <p className="text-gray-600 text-sm">Test you vigilance and readiness from emerging cyber threats. </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Security Focus</h3>
            <p className="text-gray-600 text-sm">We curated real-world scenarios and best practices for your engament.</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Assessment Instructions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-orange-600 mb-3">How it Works:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  15 questions
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  30 seconds per question
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Auto-advance when time expires
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Immediate results dashboard
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-600 mb-3">Scoring:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  <strong>14-15 correct:</strong> Optional training
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  <strong>0-13 correct:</strong> Mandatory Annual Security Awareness training required.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={onStartQuiz}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-12 rounded-xl text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Start Security Assessment
          </button>
          <p className="text-gray-500 mt-4">Click to begin the assessment</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
