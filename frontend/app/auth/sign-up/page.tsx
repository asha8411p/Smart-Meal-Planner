"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        router.push("/auth/sign-in");
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--background-color)]">
      <div className="text-center space-y-8 p-10 max-w-md mx-auto bg-[var(--container-bg-color)] rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-[var(--foreground-color)]">
          Sign Up
        </h1>
        <p className="text-md text-[var(--foreground-color)]">
          Join us today! Create your account below.
        </p>

        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-3 mb-6 rounded-lg bg-[var(--input-bg-color)] text-[var(--foreground-color)] border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--link-color)] transition-all duration-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 mb-6 rounded-lg bg-[var(--input-bg-color)] text-[var(--foreground-color)] border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--link-color)] transition-all duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 mb-6 rounded-lg bg-[var(--input-bg-color)] text-[var(--foreground-color)] border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--link-color)] transition-all duration-300"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-5 py-3 rounded-lg bg-[var(--input-bg-color)] text-[var(--foreground-color)] border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--link-color)] transition-all duration-300"
          />
        </div>

        <button
          onClick={handleSignUp}
          className="w-full bg-[var(--button-bg-color)] text-[var(--button-text-color)] px-8 py-4 rounded-full hover:bg-[var(--button-hover-color)] transition-all text-xl shadow-lg mt-8"
        >
          Sign Up
        </button>

        <p className="text-sm text-[var(--foreground-color)]">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="text-[var(--link-color)] hover:text-[var(--link-hover-color)]"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
