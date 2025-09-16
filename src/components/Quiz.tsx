@@ .. @@
 import React, { useState, useEffect } from 'react';
 import { Shield, Clock, CheckCircle, XCircle } from 'lucide-react';
 import { Question } from '../data/questions';
+import { QuizService } from '../lib/quiz';

 interface QuizProps {
   questions: Question[];
-  onComplete: (score: number, answers: { question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }[]) => void;
+  onComplete: (score: number, answers: { question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }[], totalTimeTaken: number) => void;
+  attemptId: string | null;
 }

-const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
+const Quiz: React.FC<QuizProps> = ({ questions, onComplete, attemptId }) => {
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [selectedAnswer, setSelectedAnswer] = useState<string>('');
   const [timeLeft, setTimeLeft] = useState(30);
   const [score, setScore] = useState(0);
   const [answers, setAnswers] = useState<{ question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }[]>([]);
   const [showFeedback, setShowFeedback] = useState(false);
   const [isAnswered, setIsAnswered] = useState(false);
+  const [quizStartTime] = useState(Date.now());
+  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

   const currentQuestion = questions[currentQuestionIndex];

   useEffect(() => {
+    setQuestionStartTime(Date.now());
+  }, [currentQuestionIndex]);
+
+  useEffect(() => {
     const timer = setInterval(() => {
       setTimeLeft((prev) => {
         if (prev <= 1) {
@@ -30,7 +36,7 @@ const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {

   const handleTimeUp = () => {
     if (!isAnswered) {
-      handleAnswer('');
+      handleAnswer('', true);
     }
   };

-  const handleAnswer = (answer: string) => {
+  const handleAnswer = async (answer: string, isTimeout: boolean = false) => {
     if (isAnswered) return;

     setIsAnswered(true);
+    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
     const isCorrect = answer === currentQuestion.correctAnswer;
     
     if (isCorrect) {
       setScore(prev => prev + 1);
     }

     const answerRecord = {
       question: currentQuestion.question,
-      userAnswer: answer || 'No answer (time expired)',
+      userAnswer: answer || (isTimeout ? 'No answer (time expired)' : 'Skipped'),
       correctAnswer: currentQuestion.correctAnswer,
       isCorrect
     };

     setAnswers(prev => [...prev, answerRecord]);
     setSelectedAnswer(answer);
     setShowFeedback(true);
+
+    // Log the answer to database
+    if (attemptId) {
+      try {
+        if (answer) {
+          await QuizService.submitAnswer(
+            attemptId,
+            currentQuestion.id,
+            currentQuestion.question,
+            answer,
+            currentQuestion.correctAnswer,
+            timeTaken
+          );
+        } else {
+          await QuizService.skipQuestion(
+            attemptId,
+            currentQuestion.id,
+            currentQuestion.question,
+            currentQuestion.correctAnswer
+          );
+        }
+      } catch (error) {
+        console.error('Failed to log answer:', error);
+      }
+    }

     setTimeout(() => {
       if (currentQuestionIndex < questions.length - 1) {
         setCurrentQuestionIndex(prev => prev + 1);
         setSelectedAnswer('');
         setTimeLeft(30);
         setShowFeedback(false);
         setIsAnswered(false);
       } else {
-        onComplete(score + (isCorrect ? 1 : 0), [...answers, answerRecord]);
+        const totalTimeTaken = Math.floor((Date.now() - quizStartTime) / 1000);
+        onComplete(score + (isCorrect ? 1 : 0), [...answers, answerRecord], totalTimeTaken);
       }
     }, 2000);
   };