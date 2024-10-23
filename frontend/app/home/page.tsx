"use client";
import { useState } from "react";
import Header from "../components/ui/header";
import { Exercise } from "../../types/exercise";
import { Meal } from "../../types/meal";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../types/decodedToken";

export default function Home() {
  const [suggestions, setSuggestions] = useState("No suggestion generated yet");
  const [exerciseSuggestions, setExerciseSuggestions] = useState<Exercise>();
  const [suggestionType, setSuggestionType] = useState<"meal" | "exercise">(
    "meal"
  );
  const [mealSuggestion, setMealSuggestion] = useState<Meal>();
  async function saveSuggestion() {
    const decodedToken = jwtDecode(
      localStorage.getItem("token")!
    ) as DecodedToken;
    if (suggestionType === "meal") {
      //add meal suggestion to the database with ingredients
    }
    if (suggestionType === "exercise") {
      await fetch("http://localhost:5000/exercise?userId=" + decodedToken.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(exerciseSuggestions),
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            throw new Error("An error occurred. Please try again.");
          }
        })
        .then((data) => {
          console.log(data);
        });
    }
  }
  async function generateMealSuggestion() {
    setSuggestions("Loading...");
    setSuggestionType("meal");
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
        setMealSuggestion(JSON.parse(data));
        setSuggestions(data.name);
      });
  }

  async function generateExerciseSuggestion() {
    setSuggestions("Loading...");
    setSuggestionType("exercise");
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
        setExerciseSuggestions(data);
      });
  }

  return (
    <div className="bg-[var(--background-color)] text-[var(--foreground-color)] min-h-screen flex flex-col items-center justify-center p-8 space-y-8">
      {/* Include the Header component here */}
      <Header />
      <div className="w-full max-w-5xl bg-[var(--input-bg-color)] text-[var(--input-text-color)] rounded-xl shadow-lg p-6 h-80 md:h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-[var(--focus-ring-color)]">
        {suggestionType === "meal" &&
          suggestions != "" &&
          suggestions != "No suggestion generated yet" && (
            <div className="text-center">
              <h1 className="text-3xl font-semibold">Meal Suggestion</h1>
              <h3 className="text-lg">{mealSuggestion?.name}</h3>
              <p className="text-lg">{mealSuggestion?.instructions}</p>
              <p className="text-lg">
                Calories: {mealSuggestion?.calories} kcal
              </p>
              <h3 className="text-lg">Ingredients:</h3>
              <ul className="text-lg">
                {mealSuggestion?.ingredients?.map((ingredient) => (
                  <li
                    key={
                      ingredient.name + ingredient.unit + ingredient.quantity
                    }
                  >
                    {ingredient.name}: {ingredient.quantity} {ingredient.unit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        {suggestionType === "exercise" && exerciseSuggestions != null && (
          <div className="text-center">
            <h1 className="text-3xl font-semibold">Exercise Suggestion</h1>
            <h3 className="text-lg">{exerciseSuggestions?.name}</h3>
            <p className="text-lg">{exerciseSuggestions?.description}</p>
            <p className="text-lg">
              Calories burned: {exerciseSuggestions?.calories} kcal
            </p>
            <p className="text-lg">
              Duration: {exerciseSuggestions?.duration} minutes
            </p>
          </div>
        )}
        {suggestions === "No suggestion generated yet" && (
          <div className="text-center">
            <h1 className="text-3xl font-semibold">
              No suggestion generated yet
            </h1>
          </div>
        )}
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
        <button onClick={saveSuggestion}>Save suggestion</button>
      </div>
    </div>
  );
}
