import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB4nDQAhRmAbX9qW1-MsaZJtw8JlyTa7Qw",
    authDomain: "chicagotamilcatholics-6f433.firebaseapp.com",
    projectId: "chicagotamilcatholics-6f433",
    storageBucket: "chicagotamilcatholics-6f433.appspot.com",
    messagingSenderId: "160168855788",
    appId: "1:160168855788:web:75136e333a89160fd47dc9",
    measurementId: "G-F0BZLVYY89"
  };

const app = initializeApp(firebaseConfig);

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, email, password);
  };

  const handleSignOut = async () => {
    const auth = getAuth(app);
    await auth.signOut();
    navigate('/'); // Redirect to sign-in page after signing out
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  const contextValue: AuthContextProps = {
    user,
    signIn,
    signOut: handleSignOut, // Fix the function name
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
