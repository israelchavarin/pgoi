import { createContext, useContext } from "react";
import type { FieldValues } from "react-hook-form";

interface AuthContextType {
  signUp: (user: FieldValues) => Promise<void>;
  user: FieldValues | null;
}

export const AuthContext = createContext<AuthContextType>({
  signUp: async () => {}, // Initial dummy implementation
  user: null,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
