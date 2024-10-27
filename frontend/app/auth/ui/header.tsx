import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-gradient-to-r from-[var(--button-bg-color)] to-[var(--link-color)] p-6 shadow-lg fixed top-0 w-full z-20">
      <nav className="flex justify-between items-center">
        {/* Logo/Icon */}
        <FaUserCircle className="text-[var(--foreground-color)] text-3xl mr-4" />

        {/* Centered Links */}
        <div className="flex space-x-10">
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
        </div>
        
      </nav>
    </header>
  );
}
