"use client";
import { childrenProps } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

type RoleContextType = {
  role: string;
  setRole: (value: string) => void;
};

const RoleContext = createContext<RoleContextType | null>(null);

export const AuthRole = ({ children }: childrenProps) => {
  const [role, setRole] = useState("");

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within an AuthRole provider");
  }
  return context;
};
