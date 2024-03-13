import { createContext, useContext } from "react";
import type { FieldValues } from "react-hook-form";
import { User } from "../types";

interface AuthContextType {
  signUp: (user: FieldValues) => Promise<void>;
  signIn: (loginData: FieldValues) => Promise<void>;
  user: User | null;
  isAuthenticated: boolean;
  reqErrors: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  signUp: async () => {}, // Initial dummy implementation
  signIn: async () => {},
  user: null,
  isAuthenticated: false,
  reqErrors: null,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
