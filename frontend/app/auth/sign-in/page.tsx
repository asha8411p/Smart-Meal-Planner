"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize router here

  const handleSignIn = async () => {
    await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("An error occurred. Please try again.");
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        router.push("/home");
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--background-color)]">
      <div className="text-center space-y-8 p-8 max-w-lg mx-auto bg-[var(--container-bg-color)] rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-[var(--foreground-color)]">
          Sign In
        </h1>
        <p className="text-md text-[var(--foreground-color)]">
          Welcome back! Please sign in to continue.
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--input-bg-color)] text-[var(--foreground-color)] border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--link-color)]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--input-bg-color)] text-[var(--foreground-color)] border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--link-color)]"
          />
        </div>

        <button
          onClick={handleSignIn}
          className="w-full bg-[var(--button-bg-color)] text-[var(--button-text-color)] px-8 py-4 rounded-full hover:bg-[var(--button-hover-color)] transition-all text-xl shadow-lg mt-4"
        >
          Sign In
        </button>

        <p className="text-sm text-[var(--foreground-color)]">
          Don’t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-[var(--link-color)] hover:text-[var(--link-hover-color)]"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
