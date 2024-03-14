import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import Cookies from "js-cookie";
import { postRequest, getRequest } from "../api/auth";
import type { FieldValues } from "react-hook-form";
import { AuthContext } from "../hooks/useAuth";
import type { User } from "../types";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reqErrors, setReqErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (user: FieldValues) => {
    try {
      const res = await postRequest("registration", user);
      if (res.status !== 201) throw new Error(res.error || "Unknown error");
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      // Necessary to Extract the error message from the error object
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setReqErrors(errorMessage);
    }
  };

  const signIn = async (loginData: FieldValues) => {
    try {
      const res = await postRequest("login", loginData);
      if (res.status !== 200) throw new Error(res.error || "Unknown error");
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setReqErrors(errorMessage);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    let timer: number | null = null;
    if (reqErrors) {
      timer = window.setTimeout(() => {
        setReqErrors(null);
      }, 6000);
    }
    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [reqErrors]);

  // When app loads
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await getRequest("verifytoken");
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return setUser(null);
        }

        setIsAuthenticated(true);
        setLoading(false);
        setUser(res.data);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        logout,
        user,
        isAuthenticated,
        reqErrors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
