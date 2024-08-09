"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const { token, isProfileSetup } = await res.json();
      localStorage.setItem("token", token);
      if (isProfileSetup) {
        router.push("/dashboard");
      } else {
        router.push("/dashboard");
      }
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-1/3"
      >
        <h2 className="text-xl font-semibold text-center">Welcome!</h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Sign in to your account
        </p>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded focus:none focus:ring-0"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mt-3 mb-4">
          <a
            href="/forgot-password"
            className="text-blue-500 text-sm text-center"
          >
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
        <div className="mt-2 text-center">
          <span className="text-gray-600 text-sm">Don't have an account? </span>
          <a href="/signup" className="text-blue-500 text-sm ml-3">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
}
