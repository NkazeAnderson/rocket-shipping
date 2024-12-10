"use client";

import { userT } from "@/types/schemas";
import React, { createContext, useState } from "react";

type authContextT = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: userT | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<userT | undefined>>;
};
export const AuthContext = createContext<null | authContextT>(null);
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<userT | undefined>(undefined);
  const contextValue: authContextT = {
    loggedIn,
    setLoggedIn,
    userInfo,
    setUserInfo,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
