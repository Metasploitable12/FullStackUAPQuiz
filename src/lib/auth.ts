import { supabase } from './supabase';
import type { UserProfile } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
  profile: UserProfile;
}

export class AuthService {
  // Sign up new user
  static async signUp(email: string, password: string, userData?: {
    first_name?: string;
    last_name?: string;
    department?: string;
    employee_id?: string;
  }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });

    if (error) throw error;
    return data;
  }

  // Sign in user
  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Log the login activity
    if (data.user) {
      await this.logActivity(data.user.id, 'login', {
        timestamp: new Date().toISOString()
      });

      // Update last login time
      await supabase
        .from('user_profiles')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', data.user.id);
    }

    return data;
  }

  // Sign out user
  static async signOut() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      await this.logActivity(user.id, 'logout', {
        timestamp: new Date().toISOString()
      });
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  // Get current user with profile
  static async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;

    return {
      id: user.id,
      email: user.email!,
      profile
    };
  }

  // Check if user is admin
  static async isAdmin(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user?.profile.role === 'admin';
  }

  // Log user activity
  static async logActivity(
    userId: string, 
    activityType: UserProfile['role'] extends 'admin' ? any : 'login' | 'logout' | 'quiz_start' | 'quiz_complete' | 'question_answer' | 'question_skip',
    details: any = {},
    ipAddress?: string,
    userAgent?: string
  ) {
    const { error } = await supabase.rpc('log_user_activity', {
      p_user_id: userId,
      p_activity_type: activityType,
      p_details: details,
      p_ip_address: ipAddress,
      p_user_agent: userAgent
    });

    if (error) {
      console.error('Failed to log activity:', error);
    }
  }

  // Update user profile
  static async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    // Log profile update
    await this.logActivity(userId, 'profile_update', {
      updated_fields: Object.keys(updates),
      timestamp: new Date().toISOString()
    });

    return data;
  }

  // Admin: Get all users
  static async getAllUsers() {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Admin: Update user role
  static async updateUserRole(userId: string, role: 'player' | 'admin') {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ role, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Admin: Deactivate user
  static async deactivateUser(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ status: 'inactive', updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}