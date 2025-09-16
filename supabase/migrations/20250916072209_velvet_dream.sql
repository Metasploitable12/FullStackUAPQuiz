/*
  # Security Assessment Authentication System

  1. New Tables
    - `user_profiles` - Extended user information beyond Supabase auth
      - `id` (uuid, references auth.users)
      - `email` (text, unique)
      - `role` (enum: player, admin)
      - `status` (enum: active, inactive)
      - `department` (text, optional)
      - `employee_id` (text, optional)
      - `created_at` (timestamp)
      - `last_login_at` (timestamp)
    
    - `quiz_attempts` - Track each quiz session
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `started_at` (timestamp)
      - `completed_at` (timestamp)
      - `score` (integer)
      - `total_questions` (integer)
      - `passed` (boolean)
      - `time_taken` (integer, seconds)
    
    - `question_responses` - Track individual question answers
      - `id` (uuid, primary key)
      - `attempt_id` (uuid, references quiz_attempts)
      - `question_id` (integer)
      - `question_text` (text)
      - `user_answer` (text)
      - `correct_answer` (text)
      - `is_correct` (boolean)
      - `time_taken` (integer, seconds)
      - `answered_at` (timestamp)
    
    - `user_activity_logs` - Comprehensive activity tracking
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `activity_type` (enum: login, logout, quiz_start, quiz_complete, question_answer, etc.)
      - `details` (jsonb, flexible data storage)
      - `ip_address` (text)
      - `user_agent` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Users can only see their own data unless they're admin
    - Admins can see all data and manage users

  3. Functions
    - Function to create user profile on signup
    - Function to log user activities
    - Function to calculate quiz results
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('player', 'admin');
CREATE TYPE user_status AS ENUM ('active', 'inactive');
CREATE TYPE activity_type AS ENUM (
  'login', 
  'logout', 
  'quiz_start', 
  'quiz_complete', 
  'question_answer', 
  'question_skip',
  'profile_update',
  'password_change'
);

-- User profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  role user_role DEFAULT 'player',
  status user_status DEFAULT 'active',
  department text,
  employee_id text,
  first_name text,
  last_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login_at timestamptz
);

-- Quiz attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  score integer DEFAULT 0,
  total_questions integer DEFAULT 15,
  passed boolean DEFAULT false,
  time_taken integer, -- in seconds
  questions_data jsonb, -- store the actual questions used
  created_at timestamptz DEFAULT now()
);

-- Question responses table
CREATE TABLE IF NOT EXISTS question_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid REFERENCES quiz_attempts(id) ON DELETE CASCADE NOT NULL,
  question_id integer NOT NULL,
  question_text text NOT NULL,
  user_answer text,
  correct_answer text NOT NULL,
  is_correct boolean DEFAULT false,
  time_taken integer, -- in seconds
  answered_at timestamptz DEFAULT now()
);

-- User activity logs table
CREATE TABLE IF NOT EXISTS user_activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  activity_type activity_type NOT NULL,
  details jsonb DEFAULT '{}',
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can update all profiles"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can insert profiles"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for quiz_attempts
CREATE POLICY "Users can view own attempts"
  ON quiz_attempts
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all attempts"
  ON quiz_attempts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can insert own attempts"
  ON quiz_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own attempts"
  ON quiz_attempts
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for question_responses
CREATE POLICY "Users can view own responses"
  ON question_responses
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM quiz_attempts 
      WHERE id = attempt_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all responses"
  ON question_responses
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can insert own responses"
  ON question_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM quiz_attempts 
      WHERE id = attempt_id AND user_id = auth.uid()
    )
  );

-- RLS Policies for user_activity_logs
CREATE POLICY "Users can view own activity logs"
  ON user_activity_logs
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all activity logs"
  ON user_activity_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Authenticated users can insert activity logs"
  ON user_activity_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS create_user_profile_trigger ON auth.users;
CREATE TRIGGER create_user_profile_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- Function to log user activity
CREATE OR REPLACE FUNCTION log_user_activity(
  p_user_id uuid,
  p_activity_type activity_type,
  p_details jsonb DEFAULT '{}',
  p_ip_address text DEFAULT NULL,
  p_user_agent text DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  activity_id uuid;
BEGIN
  INSERT INTO user_activity_logs (
    user_id,
    activity_type,
    details,
    ip_address,
    user_agent
  ) VALUES (
    p_user_id,
    p_activity_type,
    p_details,
    p_ip_address,
    p_user_agent
  ) RETURNING id INTO activity_id;
  
  RETURN activity_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update last login time
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_profiles 
  SET last_login_at = now()
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_completed_at ON quiz_attempts(completed_at);
CREATE INDEX IF NOT EXISTS idx_question_responses_attempt_id ON question_responses(attempt_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_logs_user_id ON user_activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_logs_activity_type ON user_activity_logs(activity_type);
CREATE INDEX IF NOT EXISTS idx_user_activity_logs_created_at ON user_activity_logs(created_at);

-- Insert default admin user (you'll need to update this with your actual admin email)
-- This will only work after you create the user in Supabase Auth
-- UPDATE user_profiles SET role = 'admin' WHERE email = 'your-admin-email@company.com';