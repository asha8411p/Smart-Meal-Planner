// app/components/MealsPage.tsx

"use client"; // Client-side component

import { useState } from "react";
import Header from '../components/ui/header'; // Adjust the path as needed
import { FiPlusCircle, FiList, FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Icons for sidebar
import { motion } from 'framer-motion'; // For animations

interface Meal {
  mealName: string;
  description: string;
  ingredients: string;
  calories?: string;
  budget?: string;
}

export default function MealsPage() {
  const [activeTab, setActiveTab] = useState<'logMeal' | 'viewMeals'>('logMeal');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // State to control sidebar collapse

  // Form state variables
  const [mealName, setMealName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [calories, setCalories] = useState('');
  const [budget, setBudget] = useState('');

  const [savedMeals, setSavedMeals] = useState<Meal[]>([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSaveMeal = () => {
    // Validate mandatory inputs
    if (!mealName || !description || !ingredients) {
      setError('Please fill in all mandatory fields.');
      setSuccessMessage('');
      return;
    }

    // Create meal object
    const meal: Meal = {
      mealName,
      description,
      ingredients,
      calories: calories || 'N/A',
      budget: budget || 'N/A',
    };

    // Save meal to state
    setSavedMeals([...savedMeals, meal]);

    // Clear form
    setMealName('');
    setDescription('');
    setIngredients('');
    setCalories('');
    setBudget('');
    setError('');
    setSuccessMessage('Meal saved successfully!');
  };

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
              <h2 className="text-2xl font-semibold">Options</h2>
            </div>
          )}

          {/* Sidebar Menu */}
          <ul className="flex-1">
            <li
              className={`cursor-pointer mb-4 flex items-center ${
                activeTab === 'logMeal' ? 'text-[var(--focus-ring-color)] font-bold' : ''
              }`}
              onClick={() => setActiveTab('logMeal')}
            >
              <FiPlusCircle className="text-xl" />
              {!sidebarCollapsed && <span className="ml-3">Log Meal</span>}
            </li>
            <li
              className={`cursor-pointer mb-4 flex items-center ${
                activeTab === 'viewMeals' ? 'text-[var(--focus-ring-color)] font-bold' : ''
              }`}
              onClick={() => setActiveTab('viewMeals')}
            >
              <FiList className="text-xl" />
              {!sidebarCollapsed && <span className="ml-3">View Saved Meals</span>}
            </li>
          </ul>

          {/* Sidebar Toggle Button at the Bottom */}
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
          {activeTab === 'logMeal' && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">Log Meal</h2>

              {error && <p className="text-red-500 mb-4">{error}</p>}
              {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveMeal();
                }}
                className="space-y-6"
              >
                {/* Meal Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Meal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
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

                {/* Ingredients */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ingredients <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)]"
                    rows={5}
                    placeholder="List ingredients separated by commas"
                  ></textarea>
                </div>

                {/* Calories and Budget */}
                <div className="md:flex md:space-x-4">
                  {/* Calories */}
                  <div className="md:w-1/2">
                    <label className="block text-sm font-medium mb-2">Calories</label>
                    <input
                      type="number"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)]"
                      placeholder="Optional"
                    />
                  </div>

                  {/* Budget */}
                  <div className="md:w-1/2 mt-6 md:mt-0">
                    <label className="block text-sm font-medium mb-2">
                      Approximate Budget (A$)
                    </label>
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)]"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  className="bg-[var(--button-bg-color)] text-[var(--button-text-color)] py-2 px-6 rounded-full hover:bg-[var(--button-hover-color)] transition-all duration-300 font-semibold"
                >
                  Save Meal
                </button>
              </form>
            </div>
          )}

          {activeTab === 'viewMeals' && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">View Saved Meals</h2>
              {savedMeals.length === 0 ? (
                <p>No meals saved yet.</p>
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
                      <p className="mb-2">
                        <strong>Ingredients:</strong> {meal.ingredients}
                      </p>
                      <p className="mb-2">
                        <strong>Calories:</strong> {meal.calories}
                      </p>
                      <p>
                        <strong>Budget:</strong>{' '}
                        {meal.budget !== 'N/A' ? `A$${meal.budget}` : 'N/A'}
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
