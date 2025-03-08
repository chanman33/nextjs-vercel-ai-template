import type { Database } from '@/utils/types/database.types';
import { supabaseAdmin } from '../../lib/supabase/supabase-admin';

// Type for User from the Database type
export type User = Database['public']['Tables']['users']['Row'];

export class UserService {
  /**
   * Get a user by ID
   */
  static async getById(id: string): Promise<User | null> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    
    return data;
  }

  /**
   * Create a new user
   */
  static async create(
    userData: Omit<User, 'id' | 'created_at' | 'updated_at'>
  ): Promise<User | null> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([userData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user:', error);
      return null;
    }
    
    return data;
  }

  /**
   * Update a user
   */
  static async update(
    id: string,
    userData: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<User | null> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user:', error);
      return null;
    }
    
    return data;
  }

  /**
   * Delete a user
   */
  static async delete(id: string): Promise<boolean> {
    const { error } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting user:', error);
      return false;
    }
    
    return true;
  }

  /**
   * Get all users
   */
  static async getAll(): Promise<User[]> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }
    
    return data || [];
  }
} 