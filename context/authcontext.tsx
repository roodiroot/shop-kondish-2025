"use client";

import { createContext, useContext, useState, useEffect } from "react";

import {
  clearAuthData,
  getAuthData,
  saveAuthData,
} from "@/utils/cookies.ts/cookies";
import { UserAuth } from "@/data/api";

interface AuthContextType {
  auth: { token: string | null; user: UserAuth | null };
  login: (token: string, userData: UserAuth) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<{
    token: string | null;
    user: UserAuth | null;
  }>({ token: null, user: null });

  useEffect(() => {
    const { token, userData } = getAuthData();
    if (token && userData) {
      setAuth({ token, user: userData });
    }
  }, []);

  const login = (token: string, userData: UserAuth) => {
    saveAuthData(token, userData);
    setAuth({ token, user: userData });
  };

  const logout = () => {
    clearAuthData();
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
