@@ .. @@
 import React, { useState } from 'react';
+import { useEffect } from 'react';
+import Login from './components/Login';
+import AdminDashboard from './components/AdminDashboard';
 import Landing from './components/Landing';
 import Quiz from './components/Quiz';
 import Results from './components/Results';
 import { getRandomQuestions, Question } from './data/questions';
+import { AuthService } from './lib/auth';
+import { QuizService } from './lib/quiz';
+import type { AuthUser } from './lib/auth';

-type AppState = 'landing' | 'quiz' | 'results';
+type AppState = 'login' | 'landing' | 'quiz' | 'results' | 'admin';

 interface QuizResult {
   score: number;
   answers: { question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }[];
 }

 function App() {
-  const [appState, setAppState] = useState<AppState>('landing');
+  const [appState, setAppState] = useState<AppState>('login');
   const [questions, setQuestions] = useState<Question[]>([]);
   const [quizResult, setQuizResult] = useState<QuizResult>({ score: 0, answers: [] });
+  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
+  const [currentAttemptId, setCurrentAttemptId] = useState<string | null>(null);
+  const [isLoading, setIsLoading] = useState(true);
+
+  useEffect(() => {
+    checkAuthStatus();
+  }, []);
+
+  const checkAuthStatus = async () => {
+    try {
+      const user = await AuthService.getCurrentUser();
+      if (user) {
+        setCurrentUser(user);
+        if (user.profile.role === 'admin') {
+          setAppState('admin');
+        } else {
+          setAppState('landing');
+        }
+      }
+    } catch (error) {
+      console.error('Auth check failed:', error);
+    } finally {
+      setIsLoading(false);
+    }
+  };
+
+  const handleLoginSuccess = async () => {
+    await checkAuthStatus();
+  };
+
+  const handleLogout = async () => {
+    try {
+      await AuthService.signOut();
+      setCurrentUser(null);
+      setAppState('login');
+      setQuizResult({ score: 0, answers: [] });
+      setQuestions([]);
+      setCurrentAttemptId(null);
+    } catch (error) {
+      console.error('Logout failed:', error);
+    }
+  };

-  const handleStartQuiz = () => {
+  const handleStartQuiz = async () => {
+    if (!currentUser) return;
+    
     const randomQuestions = getRandomQuestions(15);
     setQuestions(randomQuestions);
+    
+    try {
+      const attemptId = await QuizService.startQuizAttempt(currentUser.id, randomQuestions);
+      setCurrentAttemptId(attemptId);
+    } catch (error) {
+      console.error('Failed to start quiz attempt:', error);
+    }
+    
     setAppState('quiz');
   };

-  const handleQuizComplete = (score: number, answers: QuizResult['answers']) => {
+  const handleQuizComplete = async (score: number, answers: QuizResult['answers'], totalTimeTaken: number) => {
+    if (!currentAttemptId) return;
+    
+    try {
+      await QuizService.completeQuizAttempt(currentAttemptId, totalTimeTaken);
+    } catch (error) {
+      console.error('Failed to complete quiz attempt:', error);
+    }
+    
     setQuizResult({ score, answers });
     setAppState('results');
   };

   const handleRestart = () => {
     setAppState('landing');
     setQuizResult({ score: 0, answers: [] });
     setQuestions([]);
+    setCurrentAttemptId(null);
   };

+  if (isLoading) {
+    return (
+      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
+        <div className="text-center">
+          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
+          <p className="text-gray-600">Loading...</p>
+        </div>
+      </div>
+    );
+  }
+
   switch (appState) {
+    case 'login':
+      return <Login onLoginSuccess={handleLoginSuccess} />;
+    case 'admin':
+      return <AdminDashboard onLogout={handleLogout} />;
     case 'landing':
-      return <Landing onStartQuiz={handleStartQuiz} />;
+      return (
+        <Landing 
+          onStartQuiz={handleStartQuiz} 
+          currentUser={currentUser}
+          onLogout={handleLogout}
+        />
+      );
     case 'quiz':
-      return <Quiz questions={questions} onComplete={handleQuizComplete} />;
+      return (
+        <Quiz 
+          questions={questions} 
+          onComplete={handleQuizComplete}
+          attemptId={currentAttemptId}
+        />
+      );
     case 'results':
       return (
         <Results
@@ -36,7 +125,12 @@ function App() {
         />
       );
     default:
-      return <Landing onStartQuiz={handleStartQuiz} />;
+      return (
+        <Landing 
+          onStartQuiz={handleStartQuiz}
+          currentUser={currentUser}
+          onLogout={handleLogout}
+        />
+      );
   }
 }