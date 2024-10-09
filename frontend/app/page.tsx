"use client";
import { useState } from "react";

export default function Home() {
  const generateExerciseSuggestion = async () => {
    const response = await fetch("http://localhost:5000/exercise");
    const data = await response.json();
    console.log(data);
    setExercise(data);
  };
  const [exercise, setExercise] = useState("");
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={async () => await generateExerciseSuggestion()}>
        Generate exercise suggestion
      </button>
      <div>Exercise suggestion: {exercise}</div>
    </div>
  );
}
