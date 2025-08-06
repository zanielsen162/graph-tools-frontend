"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  user: {
    id: string | null;
    auth_source: string | null;
  } | null;
  setUser: (user:  { id: string | null; auth_source: string | null; } | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: string | null; auth_source: string | null; } | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
