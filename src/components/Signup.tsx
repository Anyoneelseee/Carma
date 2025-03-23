"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import "@/styles/Signup.css";

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    // Step 1: Sign up the user in Supabase auth
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      return;
    }

    if (!data.user) {
      setError("Signup failed. Please check your email verification.");
      return;
    }

    // Step 2: Insert into "users" table with correct user ID
    const { error: insertError } = await supabase
      .from("users")
      .insert([
        {
          id: data.user.id, // ✅ Use the user ID from signUp()
          first_name: firstName,
          last_name: lastName,
          role: null, // Let them choose a role later
        },
      ]);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setMessage("Signup successful! Check your email to confirm your account.");
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link href="/">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
