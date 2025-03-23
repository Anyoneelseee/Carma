"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import "@/styles/ResetPassword.css";

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("access_token");
    if (token) {
      supabase.auth.setSession({ access_token: token, refresh_token: "" });
    }
  }, [searchParams]);

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated successfully! Redirecting to login...");
      setTimeout(() => router.push("/"), 3000);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Reset Password</h2>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Update Password</button>
        </form>
        <p>
          <Link href="/">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
