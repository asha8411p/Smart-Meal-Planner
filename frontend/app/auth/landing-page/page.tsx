"use client";
import Link from "next/link";
import { useEffect } from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch("/api/auth/validate-token", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          router.push("/home");
        } else {
          localStorage.removeItem("token");
        }
      }
    };
    checkAuth();
  }, [router]);
  

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--background-color)]">
      <div className="text-center space-y-10 p-8 max-w-lg mx-auto bg-[var(--container-bg-color)] rounded-3xl shadow-2xl">
        <h1 className="text-6xl font-extrabold text-[var(--foreground-color)]">
          Smart Meal Planner
        </h1>
        <p className="text-xl text-[var(--foreground-color)]">
          Where tasty meets timely, and every meal and move bring you closer to your goals!
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Corrected the href to point to the sign-in page */}
          <Link href="/auth/sign-in">
            <button className="flex items-center justify-center gap-2 bg-[var(--button-bg-color)] text-[var(--button-text-color)] px-8 py-4 rounded-full hover:bg-[var(--button-hover-color)] transition-all w-full md:w-auto text-2xl shadow-lg">
              <FaSignInAlt />
              <span>Sign In</span>
            </button>
          </Link>
          <Link href="/auth/sign-up">
            <button className="flex items-center justify-center gap-2 bg-[var(--button-bg-color)] text-[var(--button-text-color)] px-8 py-4 rounded-full hover:bg-[var(--button-hover-color)] transition-all w-full md:w-auto text-2xl shadow-lg">
              <FaUserPlus />
              <span>Sign Up</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
