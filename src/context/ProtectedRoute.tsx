"use client";
import { useEffect } from "react";
import { useUser } from "@/context/UserProvider";
import axios from "axios";
import Link from "next/link";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowUsers: boolean;
};

export default function ProtectedRoute({ children, allowUsers }: ProtectedRouteProps) {
  const { user, setUser } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
        try {
            const response = await axios.get('http://localhost:5000/verify', { withCredentials: true });
            setUser(response.data);
        } catch {
            setUser(null);
        }   
    }

    checkAuth();
  }, []);

  if ((allowUsers && !user) || (!allowUsers && user)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="mt-4">You must be logged in to view this page.</p>
        <Link href="/login" className="mt-4 text-blue-500 hover:underline">
          Go to Login
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}