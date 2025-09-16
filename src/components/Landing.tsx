import React from 'react';
import { Shield, Users, Award, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';

interface LandingProps {
  onStartQuiz: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStartQuiz }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <div className="bg-orange-500 text-white py-4 px-8 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Security Assessment</h1>
            <Shield className="w-8 h-8" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Test Your <span className="text-orange-500">Security Knowledge</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Take our comprehensive security assessment to evaluate your cybersecurity awareness 
            and help protect your organization from digital threats.
          </p>
          <button
            onClick={onStartQuiz}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
          >
            <div className="flex items-center space-x-2">
              <span>Start Assessment</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Comprehensive</h3>
            <p className="text-gray-600">
              15 carefully crafted questions covering all aspects of cybersecurity awareness.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">User-Friendly</h3>
            <p className="text-gray-600">
              Intuitive interface designed for users of all technical backgrounds.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Instant Results</h3>
            <p className="text-gray-600">
              Get immediate feedback on your performance with detailed explanations.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Progress Tracking</h3>
            <p className="text-gray-600">
              Monitor your improvement over time with detailed analytics.
            </p>
          </div>
        </div>

        {/* Assessment Details */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">What You'll Learn</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Password security best practices</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Phishing attack recognition</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Social engineering awareness</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Physical security measures</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Data protection strategies</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg p-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">15</div>
                <div className="text-gray-700 mb-4">Questions</div>
                <div className="text-4xl font-bold text-orange-600 mb-2">~10</div>
                <div className="text-gray-700 mb-4">Minutes</div>
                <div className="text-4xl font-bold text-orange-600 mb-2">93%</div>
                <div className="text-gray-700">Pass Rate Required</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Ready to Test Your Knowledge?</h3>
          <p className="text-gray-600 mb-8">
            Join thousands of professionals who have improved their security awareness.
          </p>
          <button
            onClick={onStartQuiz}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
          >
            <div className="flex items-center space-x-2">
              <span>Begin Assessment Now</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Security Assessment Platform. Protecting your digital future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;