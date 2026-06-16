import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const supabaseStorage = {
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ? value : null;
  },
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};

const supabaseUrl =
  process.env.SUPABASE_URL || 'https://YOUR_PROJECT.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'YOUR_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: supabaseStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
