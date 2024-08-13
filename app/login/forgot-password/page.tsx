"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setMessage("Reset code sent. Check your email.");
      router.push("/login/reset-password");
    } else {
      setMessage("Failed to send reset code.");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-1/3"
        >
          <h1 className="text-xl font-semibold text-center">
            Forgot Password?
          </h1>
          <p className="text-sm  text-center">
            Enter your email and we'll send you a secret code!
          </p>
          <div className="my-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 mb-3 p-2 block w-full border border-gray-300 rounded focus:none focus:ring-0"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Send Reset Code
            </button>
          </div>
        </form>
        {message && <p className="text-sm text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}
