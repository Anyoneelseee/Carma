"use client"; 

import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getUserRole } from "@/lib/auth"; // ✅ Correct import
import "@/styles/Login.css";

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      return;
    }

    console.log("Login successful!");

    setTimeout(async () => {
      const role = await getUserRole(); // ✅ Fixed function call

      if (!role) {
        // Ensure user record exists before redirecting
        const { data: authData } = await supabase.auth.getUser();

        if (authData?.user) {
          const { data: existingUser } = await supabase
            .from("users")
            .select("id")
            .eq("id", authData.user.id)
            .single();

          if (!existingUser) {
            // 🚨 Fix: Insert the user WITHOUT a default role
            await supabase.from("users").insert([{ id: authData.user.id, role: null }]); 
          }
        }

        router.push("/choose-role"); // ✅ Now, they can actually choose a role
      } else {
        router.push(`/dashboard/${role}`);
      }
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-links">
          <p><Link href="/Forgotpassword">Forgot Password?</Link></p>
          <p>Dont have an account? <Link href="/Signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
