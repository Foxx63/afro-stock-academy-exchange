
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string, name?: string) => Promise<boolean>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string, name?: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, any valid email/password combination works
    if (email && password.length >= 6) {
      const userData = {
        id: '1',
        name: name || email.split('@')[0].replace(/[^a-zA-Z]/g, ''),
        email: email
      };
      setUser(userData);
      return true;
    }
    return false;
  };

  const signOut = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
