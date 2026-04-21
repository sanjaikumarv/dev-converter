"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "@/src/components/common/Login";
import { useAuth } from "@/src/lib/auth.context";

export default function Page() {
  const { user, login } = useAuth();
  const router = useRouter();
  const signInWithGoogle = async () => {
    try {
      await login();
      router.push("/home");
    } catch {
      alert("Failed to log in");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  return <Login signInWithGoogle={signInWithGoogle} />;
}
