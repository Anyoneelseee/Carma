"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // Redirect to login
  }, [router]); // ✅ Add 'router' to the dependency array

  return <p>Redirecting...</p>;
}
