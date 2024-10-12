// Home.tsx
"use client";
import { useState } from "react";
import Header from "../components/ui/header";

export default function Home() {
  // Use one combined state for meals and exercises for now, fix this later
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
    <div className="bg-[var(--background-color)] text-[var(--foreground-color)] min-h-screen flex flex-col justify-end items-center">
      {/* Include the Header component here */}
      <Header />
      <div className="h-80 w-4/5 bg-[#b29e97] rounded-md p-2 flex justify-center items-center overflow-scroll">
        {suggestions}
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-6 mb-10">
        <button
          className="bg-[var(--button-bg-color)] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[var(--button-hover-color)] transition-all shadow-lg"
          onClick={generateMealSuggestion}
        >
          Generate Meal Recipes
        </button>
        <button
          className="bg-[#ff7e5f] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ff6b4d] transition-all shadow-lg"
          onClick={generateExerciseSuggestion}
        >
          Generate Exercises
        </button>
      </div>
    </div>
  );
}
