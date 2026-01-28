// components/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();


  useEffect(() => {
    const token=sessionStorage.getItem("token")
    if (!token) {
      router.push("/login"); // Redirect to home if not logged in
    }
  }, []);


  return <>{children}</>;
}
