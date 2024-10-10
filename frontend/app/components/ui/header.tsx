// app/components/Header.tsx

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[var(--button-bg-color)] to-[var(--link-color)] p-4 shadow-lg fixed top-0 w-full z-20">
      <nav className="relative flex items-center justify-center w-full">
        {/* Logo Section */}
        <div className="absolute left-0 pl-4">
          <Link href="/home">
            <Image
              src="/logo.png" 
              alt="Logo"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <Link
            href="/dashboard"
            className="font-bold text-lg text-[var(--foreground-color)] hover:text-white transition-colors duration-300"
          >
            Dashboard
          </Link>
          <Link
            href="/meals"
            className="font-bold text-lg text-[var(--foreground-color)] hover:text-white transition-colors duration-300"
          >
            Meals
          </Link>
          <Link
            href="/exercises"
            className="font-bold text-lg text-[var(--foreground-color)] hover:text-white transition-colors duration-300"
          >
            Exercises
          </Link>
          <Link
            href="/profile"
            className="font-bold text-lg text-[var(--foreground-color)] hover:text-white transition-colors duration-300"
          >
            Profile
          </Link>
          <Link
            href="/shopping-list"
            className="font-bold text-lg text-[var(--foreground-color)] hover:text-white transition-colors duration-300"
          >
            Shopping List
          </Link>
        </div>

        {/* Spacer to balance the logo */}
        <div className="absolute right-0 pr-4" style={{ width: '50px' }}></div>
      </nav>
    </header>
  );
}
