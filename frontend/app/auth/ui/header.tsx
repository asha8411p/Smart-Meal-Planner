// Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[var(--button-bg-color)] to-[var(--link-color)] p-6 shadow-lg fixed top-0 w-full z-20">
      <nav className="flex justify-center space-x-10">
        <Link href="/dashboard" className="font-bold text-lg text-[var(--foreground-color)] hover:text-white transition-colors duration-300">
          Dashboard
        </Link>
        <Link href="/shopping-list" className="font-bold text-lg text-[var(--foreground-color)] hover:text-white transition-colors duration-300">
          Shopping List
        </Link>
        <Link href="/meals" className="font-bold text-lg text-[var(--foreground-color)] hover:text-white transition-colors duration-300">
          Meals
        </Link>
        <Link href="/exercises" className="font-bold text-lg text-[var(--foreground-color)] hover:text-white transition-colors duration-300">
          Exercises
        </Link>
        <Link href="/profile" className="font-bold text-lg text-[var(--foreground-color)] hover:text-white transition-colors duration-300">
          Profile
        </Link>
      </nav>
    </header>
  );
}
