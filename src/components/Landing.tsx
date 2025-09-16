@@ .. @@
 import React from 'react';
-import { Shield, Award, Clock, Users } from 'lucide-react';
+import { Shield, Award, Clock, Users, LogOut, User } from 'lucide-react';
+import type { AuthUser } from '../lib/auth';

 interface LandingProps {
   onStartQuiz: () => void;
+  currentUser: AuthUser | null;
+  onLogout: () => void;
 }

-const Landing: React.FC<LandingProps> = ({ onStartQuiz }) => {
+const Landing: React.FC<LandingProps> = ({ onStartQuiz, currentUser, onLogout }) => {
   return (
     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
       <div className="container mx-auto px-4 py-8">
         {/* Header */}
         <div className="text-center mb-12">
           {/* Security Awareness Month Banner */}
-          <div className="bg-orange-500 text-white py-4 px-8 rounded-lg mb-8 shadow-lg">
-            <div className="flex items-center justify-center space-x-3">
-              <Shield className="w-8 h-8" />
-              <h1 className="text-2xl font-bold">Security Awareness Month 2025</h1>
-              <Shield className="w-8 h-8" />
+          <div className="bg-orange-500 text-white py-4 px-8 rounded-lg mb-8 shadow-lg">
+            <div className="flex items-center justify-between">
+              <div className="flex items-center space-x-3">
+                <Shield className="w-8 h-8" />
+                <h1 className="text-2xl font-bold">Security Awareness Month 2025</h1>
+                <Shield className="w-8 h-8" />
+              </div>
+              {currentUser && (
+                <div className="flex items-center space-x-4">
+                  <div className="flex items-center space-x-2">
+                    <User className="w-5 h-5" />
+                    <span className="text-sm">
+                      {currentUser.profile.first_name} {currentUser.profile.last_name}
+                    </span>
+                  </div>
+                  <button
+                    onClick={onLogout}
+                    className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded transition-colors"
+                  >
+                    <LogOut className="w-4 h-4" />
+                    <span className="text-sm">Logout</span>
+                  </button>
+                </div>
+              )}
             </div>
             <p className="text-orange-100 mt-2">Knockout User Assessment</p>
           </div>