"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import "@/styles/ChooseRole.css"; 

export default function ChooseRole() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      const role = await getUserRole();
      if (role !== null) { // ✅ Only redirect if role is explicitly set
        router.push(`/dashboard/${role}`);
      }
    };
    checkRole();
  }, [router]);
  

  const selectRole = async (role: string) => {
    setLoading(true);
    const { data: authData, error } = await supabase.auth.getUser();
  
    if (error || !authData?.user) {
      router.push("/login");
      return;
    }
  
    // ✅ Ensure the role is updated only when the user chooses
    const { error: updateError } = await supabase
      .from("users")
      .update({ role })
      .eq("id", authData.user.id)
      .select();
  
    if (updateError) {
      console.error(updateError.message);
      setLoading(false);
      return;
    }
  
    router.push(`/dashboard/${role}`);
  };
  
  

  return (
    <div className="role-container">
      <h1 className="role-title">Choose Your Role</h1>
      <div className="role-buttons">
        <button onClick={() => selectRole("student")} className="role-button student" disabled={loading}>
          Continue as Student
        </button>
        <button onClick={() => selectRole("professor")} className="role-button professor" disabled={loading}>
          Continue as Professor
        </button>
      </div>
    </div>
  );
}
