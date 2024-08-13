"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ConfirmEmail() {
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  console.log(token);

  useEffect(() => {
    if (token) {
      fetch("/api/auth/confirm-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setMessage(data.error);
          } else {
            setMessage("Email confirmed successfully!");
            router.push("/login");
          }
        });
    }
  }, [token]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-1/3">
          <h1 className="text-xl font-semibold text-center">
            Email Confirmation
          </h1>
          {message ? (
            <p className="text-sm text-center mt-4">{message}</p>
          ) : (
            <p className="text-sm text-center mt-4">Confirming your email...</p>
          )}
        </div>
      </div>
    </div>
  );
}
