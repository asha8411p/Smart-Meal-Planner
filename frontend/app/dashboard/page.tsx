// app/components/DashboardPage.tsx

"use client"; // Client-side component

import { useState } from "react";
import Header from '../components/ui/header'; // Adjust path as needed
import { FiList, FiPieChart, FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Icons for sidebar
import { motion } from 'framer-motion'; // For animations

interface Meal {
  id: number;
  mealName: string;
  description: string;
  calories: string;
}

interface Exercise {
  id: number;
  exerciseName: string;
  description: string;
  caloriesBurned: string;
}

interface ScheduledItem {
  id: number;
  title: string;
  start: Date;
  end: Date;
  type: 'meal' | 'exercise';
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'viewMeals' | 'viewExercises' | 'viewProgress' | 'schedule'>('viewMeals');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // State to control sidebar collapse

  // Mock Data
  const [savedMeals] = useState<Meal[]>([
    {
      id: 1,
      mealName: "Grilled Chicken Salad",
      description: "A healthy salad with grilled chicken, lettuce, and tomatoes.",
      calories: "350",
    },
    {
      id: 2,
      mealName: "Pasta Bolognese",
      description: "Italian pasta with a rich tomato meat sauce.",
      calories: "600",
    },
  ]);

  const [savedExercises] = useState<Exercise[]>([
    {
      id: 1,
      exerciseName: "Morning Jog",
      description: "A 30-minute jog around the park.",
      caloriesBurned: "250",
    },
    {
      id: 2,
      exerciseName: "Weight Lifting",
      description: "1-hour session focusing on strength training.",
      caloriesBurned: "400",
    },
  ]);

  const [scheduledItems, setScheduledItems] = useState<ScheduledItem[]>([]);

  const handleScheduleItem = (item: Meal | Exercise, type: 'meal' | 'exercise') => {
    const title = type === 'meal' ? item.mealName : item.exerciseName;
    const start = new Date(prompt("Enter start date and time (YYYY-MM-DD HH:MM)") || '');
    const end = new Date(prompt("Enter end date and time (YYYY-MM-DD HH:MM)") || '');

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      alert("Invalid date and time format");
      return;
    }

    const scheduledItem: ScheduledItem = {
      id: scheduledItems.length + 1,
      title,
      start,
      end,
      type,
    };

    setScheduledItems([...scheduledItems, scheduledItem]);
  };

  async function handleScheduleToGoogleCalendar(item) {
    const event = {
      summary: item.title,
      start: {
        dateTime: item.start.toISOString(),
        timeZone: 'America/Los_Angeles' // Adjust time zone as needed
      },
      end: {
        dateTime: item.end.toISOString(),
        timeZone: 'America/Los_Angeles' // Adjust time zone as needed
      }
    };

    try {
      const response = await fetch("http://localhost:5000/google/calendar/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        alert("Event scheduled successfully in Google Calendar!");
      } else {
        throw new Error("Failed to schedule event in Google Calendar");
      }
    } catch (error) {
      console.error("Error scheduling event:", error);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background-color)] text-[var(--foreground-color)] flex flex-col">
      <Header />

      {/* Main Container */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div
          className={`flex flex-col h-[calc(100vh-64px)] bg-[var(--input-bg-color)] p-4 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'
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
              className={`cursor-pointer mb-4 flex items-center ${activeTab === 'viewMeals' ? 'text-[var(--focus-ring-color)] font-bold' : ''
                }`}
              onClick={() => setActiveTab('viewMeals')}
            >
              <FiList className="text-xl" />
              {!sidebarCollapsed && <span className="ml-3">Meal History</span>}
            </li>
            <li
              className={`cursor-pointer mb-4 flex items-center ${activeTab === 'viewExercises' ? 'text-[var(--focus-ring-color)] font-bold' : ''
                }`}
              onClick={() => setActiveTab('viewExercises')}
            >
              <FiList className="text-xl" />
              {!sidebarCollapsed && <span className="ml-3">Exercise History</span>}
            </li>
            <li
              className={`cursor-pointer mb-4 flex items-center ${activeTab === 'viewProgress' ? 'text-[var(--focus-ring-color)] font-bold' : ''
                }`}
              onClick={() => setActiveTab('viewProgress')}
            >
              <FiPieChart className="text-xl" />
              {!sidebarCollapsed && <span className="ml-3">Monitor Progress</span>}
            </li>
            <li
              className={`cursor-pointer mb-4 flex items-center ${activeTab === 'schedule' ? 'text-[var(--focus-ring-color)] font-bold' : ''
                }`}
              onClick={() => setActiveTab('schedule')}
            >
              <FiPieChart className="text-xl" />
              {!sidebarCollapsed && <span className="ml-3">Schedule Items</span>}
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
              <h2 className="text-3xl font-semibold mb-6">Meal History</h2>
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
                      {/* <button
                        className="mt-4 bg-[var(--button-bg-color)] text-[var(--button-text-color)] py-1 px-4 rounded-full hover:bg-[var(--button-hover-color)] transition-all duration-300 font-semibold"
                        onClick={() => handleScheduleItem(meal, 'meal')}
                      >
                        Schedule Meal
                      </button> */}
                      <button
                        className="schedule-google-button"
                        onClick={() => handleScheduleToGoogleCalendar(meal)}
                      >
                        Add to Google Calendar
                      </button>

                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'viewExercises' && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">Exercise History</h2>
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
                      <button
                        className="mt-4 bg-[var(--button-bg-color)] text-[var(--button-text-color)] py-1 px-4 rounded-full hover:bg-[var(--button-hover-color)] transition-all duration-300 font-semibold"
                        onClick={() => handleScheduleItem(exercise, 'exercise')}
                      >
                        Schedule Exercise
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'viewProgress' && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">Monitor Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold mb-2">Meals Logged:</h3>
                  <p className="text-3xl font-bold">{savedMeals.length}</p>
                </div>
                <div className="bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold mb-2">Exercises Logged:</h3>
                  <p className="text-3xl font-bold">{savedExercises.length}</p>
                </div>
                <div className="bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold mb-2">Calories Consumed:</h3>
                  <p className="text-3xl font-bold">{savedMeals.reduce((total, meal) => total + parseInt(meal.calories), 0)}</p>
                </div>
                <div className="bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold mb-2">Calories Burned:</h3>
                  <p className="text-3xl font-bold">{savedExercises.reduce((total, exercise) => total + parseInt(exercise.caloriesBurned), 0)}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">Scheduled Items</h2>
              {scheduledItems.length === 0 ? (
                <button
                  onClick={() => window.location.href = "http://localhost:5000/auth/google"}
                  className="schedule-google-button"
                >
                  Connect to Google Calendar
                </button>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {scheduledItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="mb-2">
                        <strong>Type:</strong> {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </p>
                      <p className="mb-2">
                        <strong>Start:</strong> {item.start.toLocaleString()}
                      </p>
                      <p>
                        <strong>End:</strong> {item.end.toLocaleString()}
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