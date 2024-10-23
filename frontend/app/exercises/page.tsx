// app/components/ExercisePage.tsx

"use client"; // Client-side component

import { useEffect, useState } from "react";
import Header from "../components/ui/header"; // Adjust the path as needed
import {
  FiPlusCircle,
  FiList,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi"; // Icons for sidebar
import { motion } from "framer-motion"; // For animations
import { jwtDecode } from "jwt-decode";
import { Exercise } from "../../types/exercise";
import { DecodedToken } from "../../types/decodedToken";

export default function ExercisePage() {
  const [activeTab, setActiveTab] = useState<"logExercise" | "viewExercises">(
    "logExercise"
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // State to control sidebar collapse

  // Form state variables
  const [exerciseName, setExerciseName] = useState("");
  const [description, setDescription] = useState("");
  const [caloriesBurnedPerSet, setCaloriesBurnedPerSet] = useState("");
  const [duration, setDuration] = useState("");

  const [savedExercises, setSavedExercises] = useState<Exercise[]>([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const decodedToken = jwtDecode(
      localStorage.getItem("token")!
    ) as DecodedToken;
    fetch("http://localhost:5000/exercise?userId=" + decodedToken.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch exercises.");
        }
      })
      .then((data) => {
        setSavedExercises(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleSaveExercise = async () => {
    // Validate mandatory inputs
    if (!exerciseName || !description || !caloriesBurnedPerSet) {
      setError("Please fill in all mandatory fields.");
      setSuccessMessage("");
      return;
    }
    const decodedToken = jwtDecode(
      localStorage.getItem("token")!
    ) as DecodedToken;
    await fetch("http://localhost:5000/exercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: exerciseName,
        description: description,
        calories: caloriesBurnedPerSet,
        duration: duration,
        userId: decodedToken.id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to save exercise.");
        }
      })
      .catch((err) => {
        setError(err.message);
        setSuccessMessage("");
      });

    // Create exercise object
    const exercise: Exercise = {
      name: exerciseName,
      description,
      calories: caloriesBurnedPerSet,
      duration: duration || "N/A",
      id: 0,
    };

    // Save exercise to state
    setSavedExercises([...savedExercises, exercise]);

    // Clear form
    setExerciseName("");
    setDescription("");
    setCaloriesBurnedPerSet("");
    setDuration("");
    setError("");
    setSuccessMessage("Exercise saved successfully!");
  };

  return (
    <div className="min-h-screen bg-[var(--background-color)] text-[var(--foreground-color)] flex flex-col">
      <Header />

      {/* Main Container */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div
          className={`flex flex-col h-[calc(100vh-64px)] bg-[var(--input-bg-color)] p-4 transition-all duration-300 ${
            sidebarCollapsed ? "w-20" : "w-64"
          }`}
        >
          {/* Sidebar Header */}
          {!sidebarCollapsed && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Options</h2>
            </div>
          )}

          {/* Sidebar Menu */}
          <ul className="flex-1">
            <li
              className={`cursor-pointer mb-4 flex items-center ${
                activeTab === "logExercise"
                  ? "text-[var(--focus-ring-color)] font-bold"
                  : ""
              }`}
              onClick={() => setActiveTab("logExercise")}
            >
              <FiPlusCircle className="text-xl" />
              {!sidebarCollapsed && <span className="ml-3">Log Exercise</span>}
            </li>
            <li
              className={`cursor-pointer mb-4 flex items-center ${
                activeTab === "viewExercises"
                  ? "text-[var(--focus-ring-color)] font-bold"
                  : ""
              }`}
              onClick={() => setActiveTab("viewExercises")}
            >
              <FiList className="text-xl" />
              {!sidebarCollapsed && (
                <span className="ml-3">View Saved Exercises</span>
              )}
            </li>
          </ul>

          {/* Sidebar Toggle Button at the Bottom */}
          <div className="mt-auto">
            <button
              className="text-2xl focus:outline-none w-full flex items-center justify-center py-2 bg-[var(--input-border-color)] rounded-lg hover:bg-[var(--focus-ring-color)] transition-colors duration-300"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-expanded={!sidebarCollapsed}
              aria-label={
                sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              {sidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === "logExercise" && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">Log Exercise</h2>

              {error && <p className="text-red-500 mb-4">{error}</p>}
              {successMessage && (
                <p className="text-green-500 mb-4">{successMessage}</p>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveExercise();
                }}
                className="space-y-6"
              >
                {/* Exercise Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Exercise Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                    className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)]"
                    rows={3}
                  ></textarea>
                </div>

                {/* Calories Burned per Set */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Calories Burned per Set{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={caloriesBurnedPerSet}
                    onChange={(e) => setCaloriesBurnedPerSet(e.target.value)}
                    className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)]"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)]"
                    placeholder="Optional"
                  />
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  className="bg-[var(--button-bg-color)] text-[var(--button-text-color)] py-2 px-6 rounded-full hover:bg-[var(--button-hover-color)] transition-all duration-300 font-semibold"
                >
                  Save Exercise
                </button>
              </form>
            </div>
          )}

          {activeTab === "viewExercises" && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">
                View Saved Exercises
              </h2>
              {!(savedExercises?.length > 0) ? (
                <p>No exercises saved yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedExercises.map((exercise, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        {exercise.name}
                      </h3>
                      <p className="mb-2">{exercise.description}</p>
                      <p className="mb-2">
                        <strong>Calories Burned per Set:</strong>{" "}
                        {exercise.calories}
                      </p>
                      <p>
                        <strong>Duration:</strong>{" "}
                        {exercise.duration !== "N/A"
                          ? `${exercise.duration} minutes`
                          : "N/A"}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
