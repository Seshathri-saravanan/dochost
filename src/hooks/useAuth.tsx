import axios from "axios";
import { useRouter } from "next/router";
import React, { Component, useEffect, useState } from "react";

const ACCESS_TOKEN_KEY = "access_token";
export const AuthContext = React.createContext({});
export const useAuth = () => React.useContext(AuthContext);
export const AuthProvider = (props: any) => {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = useState(true);
  const logout = () => {
    setUser(null);
  };

  const handleChangeUser = async () => {
    try {
      const re1 = await axios.get("http://localhost:3001/userprofile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
        },
      });

      setUser(re1.data);
    } catch (error) {
      console.log("caufht the error");
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    const res = await axios.post("http://localhost:3001/login", {
      email,
      password,
    });
    localStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token);
    handleChangeUser();
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await axios.post("http://localhost:3001/sign-up", {
      email,
      password,
      name,
    });
    localStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token);
    handleChangeUser();
  };

  React.useEffect(() => {
    try {
      setLoading(true);
      handleChangeUser();
    } catch (error) {
      console.log("error login");
      setLoading(false);
    }
  }, []);
  const router = useRouter();
  useEffect(() => {
    console.log(user, loading, router.pathname);
    if (!user && !loading && router.pathname !== "/login") {
      router.push("/login");
    }
    if (user && !loading && router.pathname == "/login") router.push("/");
  }, [user, loading]);
  return (
    <AuthContext.Provider
      value={{ user, logout, login, loading, signup }}
      {...props}
    />
  );
};
