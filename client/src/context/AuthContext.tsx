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

  const signUp = async (user: FieldValues) => {
    try {
      const res = await registerUser(user);
      if (res.status !== 201) throw new Error(res.error);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        user,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
