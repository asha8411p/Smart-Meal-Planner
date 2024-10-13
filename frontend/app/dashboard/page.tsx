// app/components/DashboardPage.tsx

"use client"; // Client-side component

import { useState } from "react";
import Header from '../components/ui/header';
import { FiList, FiPieChart, FiChevronLeft, FiChevronRight } from 'react-icons/fi'; 
import { motion } from 'framer-motion'; 

interface Meal {
  mealName: string;
  description: string;
  calories: string;
}

interface Exercise {
  exerciseName: string;
  description: string;
  caloriesBurned: string;
}

interface Progress {
  date: string;
  mealsLogged: number;
  exercisesLogged: number;
  caloriesConsumed: number;
  caloriesBurned: number;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'viewMeals' | 'viewExercises' | 'viewProgress'>('viewMeals');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); 

  
  const [savedMeals] = useState<Meal[]>([
    {
      mealName: "Grilled Chicken Salad",
      description: "A healthy salad with grilled chicken, lettuce, and tomatoes.",
      calories: "350",
    },
    {
      mealName: "Pasta Bolognese",
      description: "Italian pasta with a rich tomato meat sauce.",
      calories: "600",
    },
  ]);

  const [savedExercises] = useState<Exercise[]>([
    {
      exerciseName: "Morning Jog",
      description: "A 30-minute jog around the park.",
      caloriesBurned: "250",
    },
    {
      exerciseName: "Weight Lifting",
      description: "1-hour session focusing on strength training.",
      caloriesBurned: "400",
    },
  ]);

  const [progress] = useState<Progress>({
    date: "2024-10-13",
    mealsLogged: 5,
    exercisesLogged: 3,
    caloriesConsumed: 1800,
    caloriesBurned: 1200,
  });

  return (
    <div className="min-h-screen bg-[var(--background-color)] text-[var(--foreground-color)] flex flex-col">
      <Header />

      {/* Main Container */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div
          className={`flex flex-col h-[calc(100vh-64px)] bg-[var(--input-bg-color)] p-4 transition-all duration-300 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Sidebar Header */}
          {!sidebarCollapsed && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Dashboard Options</h2>
            </div>
          )}

          {/* Sidebar Menu */}
          <ul className="flex-1">
            <li
              className={`cursor-pointer mb-4 flex items-center ${
                activeTab === 'viewMeals' ? 'text-[var(--focus-ring-color)] font-bold' : ''
              }`}
              onClick={() => setActiveTab('viewMeals')}
            >
              <FiList className="text-xl" />
              {!sidebarCollapsed && <span className="ml-3">View Meals</span>}
            </li>
            <li
              className={`cursor-pointer mb-4 flex items-center ${
                activeTab === 'viewExercises' ? 'text-[var(--focus-ring-color)] font-bold' : ''
              }`}
              onClick={() => setActiveTab('viewExercises')}
            >
              <FiList className="text-xl" />
              {!sidebarCollapsed && <span className="ml-3">View Exercises</span>}
            </li>
            <li
              className={`cursor-pointer mb-4 flex items-center ${
                activeTab === 'viewProgress' ? 'text-[var(--focus-ring-color)] font-bold' : ''
              }`}
              onClick={() => setActiveTab('viewProgress')}
            >
              <FiPieChart className="text-xl" />
              {!sidebarCollapsed && <span className="ml-3">View Progress</span>}
            </li>
          </ul>

          {/* Sidebar Toggle Button */}
          <div className="mt-auto">
            <button
              className="text-2xl focus:outline-none w-full flex items-center justify-center py-2 bg-[var(--input-border-color)] rounded-lg hover:bg-[var(--focus-ring-color)] transition-colors duration-300"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-expanded={!sidebarCollapsed}
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'viewMeals' && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">View Saved Meals</h2>
              {savedMeals.length === 0 ? (
                <p>No meals logged yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedMeals.map((meal, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                      <h3 className="text-xl font-semibold mb-2">{meal.mealName}</h3>
                      <p className="mb-2">{meal.description}</p>
                      <p>
                        <strong>Calories:</strong> {meal.calories}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'viewExercises' && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">View Saved Exercises</h2>
              {savedExercises.length === 0 ? (
                <p>No exercises logged yet.</p>
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
                      <h3 className="text-xl font-semibold mb-2">{exercise.exerciseName}</h3>
                      <p className="mb-2">{exercise.description}</p>
                      <p>
                        <strong>Calories Burned:</strong> {exercise.caloriesBurned}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'viewProgress' && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">Progress Summary</h2>
              <div className="bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg p-6">
                <p className="mb-2">
                  <strong>Date:</strong> {new Date(progress.date).toLocaleDateString()}
                </p>
                <p className="mb-2">
                  <strong>Meals Logged:</strong> {progress.mealsLogged}
                </p>
                <p className="mb-2">
                  <strong>Exercises Logged:</strong> {progress.exercisesLogged}
                </p>
                <p className="mb-2">
                  <strong>Calories Consumed:</strong> {progress.caloriesConsumed}
                </p>
                <p>
                  <strong>Calories Burned:</strong> {progress.caloriesBurned}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
