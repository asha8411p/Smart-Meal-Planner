"use client";
import { useState } from "react";
import Header from "../components/ui/header";

export default function Home() {
  const [suggestions, setSuggestions] = useState("No suggestion generated yet");

  async function generateMealSuggestion() {
    setSuggestions("Loading...");
    await fetch("http://localhost:5000/meal/suggestion", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setSuggestions("An error occurred. Please try again.");
          throw new Error("An error occurred. Please try again.");
        }
      })
      .then((data) => {
        setSuggestions(data);
      });
  }

  async function generateExerciseSuggestion() {
    setSuggestions("Loading...");
    await fetch("http://localhost:5000/exercise/suggestion", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setSuggestions("An error occurred. Please try again.");
          throw new Error("An error occurred. Please try again.");
        }
      })
      .then((data) => {
        setSuggestions(data);
      });
  }

  return (
    <div className="bg-[var(--background-color)] text-[var(--foreground-color)] min-h-screen flex flex-col items-center justify-center p-8 space-y-8">
      {/* Include the Header component here */}
      <Header />

      {/* Suggestions Box with increased size and scroll */}
      <div className="w-full max-w-5xl bg-[var(--input-bg-color)] text-[var(--input-text-color)] rounded-xl shadow-lg p-6 h-80 md:h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-[var(--focus-ring-color)]">
        <p className="text-lg font-medium leading-relaxed whitespace-pre-line">
          {suggestions}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-6 mt-4">
        <button
          className="bg-[var(--button-bg-color)] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[var(--button-hover-color)] transition-all duration-300 transform hover:scale-105 shadow-lg"
          onClick={generateMealSuggestion}
        >
          Generate Meal Recipes
        </button>
        <button
          className="bg-[#ff7e5f] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ff6b4d] transition-all duration-300 transform hover:scale-105 shadow-lg"
          onClick={generateExerciseSuggestion}
        >
          Generate Exercises
        </button>
      </div>
    </div>
  );
}
