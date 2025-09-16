import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface UserProfile {
  id: string;
  email: string;
  role: 'player' | 'admin';
  status: 'active' | 'inactive';
  department?: string;
  employee_id?: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  started_at: string;
  completed_at?: string;
  score: number;
  total_questions: number;
  passed: boolean;
  time_taken?: number;
  questions_data?: any;
  created_at: string;
}

export interface QuestionResponse {
  id: string;
  attempt_id: string;
  question_id: number;
  question_text: string;
  user_answer?: string;
  correct_answer: string;
  is_correct: boolean;
  time_taken?: number;
  answered_at: string;
}

export interface UserActivityLog {
  id: string;
  user_id: string;
  activity_type: 'login' | 'logout' | 'quiz_start' | 'quiz_complete' | 'question_answer' | 'question_skip' | 'profile_update' | 'password_change';
  details: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}