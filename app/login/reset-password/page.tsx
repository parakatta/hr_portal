"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code, newPassword }),
    });

    if (res.ok) {
      setMessage("Password updated successfully.");
      router.push("/login");
    } else {
      setMessage("Failed to update password.");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-1/3"
        >
          <h1 className="text-xl font-semibold text-center">Reset Password</h1>
          <p className="text-sm  text-center">
            Type in the secret code, your email and new password
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
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter the reset code"
              className="mt-1 mb-3 p-2 block w-full border border-gray-300 rounded focus:none focus:ring-0"
              required
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="mt-1 mb-3 p-2 block w-full border border-gray-300 rounded focus:none focus:ring-0"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Reset Password
            </button>
          </div>
        </form>
        {message && <p className="text-sm text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}
