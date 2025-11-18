'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signOut as firebaseSignOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { jwtDecode } from 'jwt-decode';

// Define a generic session type
interface Session {
  email: string | null;
  token: string;
  provider: 'google' | 'email';
}

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for custom JWT in localStorage on initial load
    const customToken = localStorage.getItem('authToken');
    if (customToken) {
      const decoded: { email: string } = jwtDecode(customToken);
      setSession({ email: decoded.email, token: customToken, provider: 'email' });
    }
    setLoading(false);

    // Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        setSession({
          email: firebaseUser.email,
          token: token,
          provider: 'google',
        });
        localStorage.removeItem('authToken'); // Remove custom token if Firebase user exists
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    // Listener will handle session creation
  };

  const signInWithEmail = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to sign in.');
    }

    const { token } = await response.json();
    const decoded: { email: string } = jwtDecode(token);
    localStorage.setItem('authToken', token);
    setSession({ email: decoded.email, token, provider: 'email' });
  };

  const signOut = async () => {
    if (session?.provider === 'google') {
      await firebaseSignOut(auth);
    }
    localStorage.removeItem('authToken');
    setSession(null);
  };

  const getToken = async (): Promise<string | null> => {
    if (!session) return null;
    if (session.provider === 'google' && auth.currentUser) {
      return await auth.currentUser.getIdToken(true); // Force refresh
    }
    return session.token;
  };

  return (
    <AuthContext.Provider value={{ session, loading, signInWithGoogle, signInWithEmail, signOut, getToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
