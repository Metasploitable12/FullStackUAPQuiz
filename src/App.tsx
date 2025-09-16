import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { AuthService } from './lib/auth';
import type { AuthUser } from './lib/auth';
import Landing from './components/Landing';
import Login from './components/Login';
import Quiz from './components/Quiz';
import AdminDashboard from './components/AdminDashboard';

type AppState = 'landing' | 'login' | 'quiz' | 'admin';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await checkUser();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setCurrentState('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await AuthService.getCurrentUser();
      setUser(currentUser);
      
      if (currentUser) {
        if (currentUser.profile.role === 'admin') {
          setCurrentState('admin');
        } else {
          setCurrentState('quiz');
        }
      } else {
        setCurrentState('landing');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setCurrentState('landing');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = async () => {
    await checkUser();
  };

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      setUser(null);
      setCurrentState('landing');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleStartQuiz = () => {
    setCurrentState('login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  switch (currentState) {
    case 'landing':
      return <Landing onStartQuiz={handleStartQuiz} />;
    
    case 'login':
      return <Login onLoginSuccess={handleLoginSuccess} />;
    
    case 'quiz':
      return user ? <Quiz user={user} onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} />;
    
    case 'admin':
      return user ? <AdminDashboard onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} />;
    
    default:
      return <Landing onStartQuiz={handleStartQuiz} />;
  }
}

export default App;