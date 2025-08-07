'use client';
import ProtectedRoute from "@/context/ProtectedRoute";

export default function Saved() {
  return (
    <ProtectedRoute allowUsers={true}>
        <div className="p-5 sans-serif">
     
        </div>
    </ProtectedRoute>    
  );
}
