import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getUserById = async (userId) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) throw new Error(error.message);
    return data;
};

export const createUser = async (userData) => {
    const { data, error } = await supabase
        .from('users')
        .insert([userData]);

    if (error) throw new Error(error.message);
    return data;
};

export const updateUser = async (userId, userData) => {
    const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', userId);

    if (error) throw new Error(error.message);
    return data;
};

export const deleteUser = async (userId) => {
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

    if (error) throw new Error(error.message);
    return data;
};