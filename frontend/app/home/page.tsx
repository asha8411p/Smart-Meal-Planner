// Home.tsx

import Header from '../components/ui/header';

export default function Home() {
  return (
    <div className="bg-[var(--background-color)] text-[var(--foreground-color)] min-h-screen flex flex-col justify-end items-center">
      {/* Include the Header component here */}
      <Header />

      {/* Action Buttons */}
      <div className="flex space-x-6 mb-10">
        <button className="bg-[var(--button-bg-color)] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[var(--button-hover-color)] transition-all shadow-lg">
          Generate Meal Recipes
        </button>
        <button className="bg-[#ff7e5f] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ff6b4d] transition-all shadow-lg">
          Generate Exercises
        </button>
      </div>
    </div>
  );
}
