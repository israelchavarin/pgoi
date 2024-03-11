import { useState } from "react";
import type { ReactNode } from "react";
import { registerUser } from "../api/auth";
import type { FieldValues } from "react-hook-form";
import { AuthContext } from "../hooks/useAuth";
import { User } from "../types";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [regErrors, setRegErrors] = useState<string | null>(null);

  const signUp = async (user: FieldValues) => {
    try {
      const res = await registerUser(user);
      if (res.status !== 201) throw new Error(res.error || "Unknown error");
      // Not using !res.ok because the API returns status code 201 when successful
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      // Necessary to Extract the error message from the error object
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setRegErrors(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        user,
        isAuthenticated,
        regErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
