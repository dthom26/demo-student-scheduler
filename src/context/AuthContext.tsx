import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
  role: 'student' | 'manager' | null;
  isAuthenticated: boolean;
  selectStudent: () => void;
  selectManager: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<'student' | 'manager' | null>(() => {
    // Initialize from localStorage
    return localStorage.getItem('userRole') as 'student' | 'manager' | null;
  });

  const selectStudent = () => {
    setRole('student');
    localStorage.setItem('userRole', 'student');
  };

  const selectManager = () => {
    setRole('manager');
    localStorage.setItem('userRole', 'manager');
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('userRole');
  };

  const value: AuthContextType = {
    role,
    isAuthenticated: !!role,
    selectStudent,
    selectManager,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
