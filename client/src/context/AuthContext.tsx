import { useState } from "react";
import type { ReactNode } from "react";
import { registerUser } from "../api/auth";
import type { FieldValues } from "react-hook-form";
import { AuthContext } from "../hooks/useAuth";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<FieldValues | null>(null);

  const signUp = async (user: FieldValues) => {
    const res = await registerUser(user);
    console.log(res);
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
