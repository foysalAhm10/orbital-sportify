import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Watch auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    // Initial fetch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Login with email (behind the scenes)
  const loginWithEmail = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, msg: error.message };
    }

    return { success: true };
  };

  // Login with username (wrapper)
  const login = async (username, password) => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('username', username.trim().toLowerCase())
      .single();

    if (error || !profile?.email) {
      return { success: false, msg: 'Username not found' };
    }

    return await loginWithEmail(profile.email, password);
  };

  // Logout
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error.message);
  };

  return (
    <AuthContext.Provider value={
      { user, 
        isAuthenticated: !!user,
        login, 
        logout, 
        loading }
      }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

