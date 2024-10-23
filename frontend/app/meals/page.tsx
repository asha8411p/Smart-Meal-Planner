"use client"; // Client-side component

import { useState } from "react";
import Header from '../components/ui/header'; // Adjust the path as needed
import { FiPlusCircle, FiList, FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Icons for sidebar
import { motion } from 'framer-motion'; // For animations

interface Ingredient {
  name: string;
  unit: string;
  quantity: string;
  price: string;
}

interface Meal {
  mealName: string;
  description: string;
  ingredients: Ingredient[];
  calories?: string;
  budget?: string;
}

export default function MealsPage() {
  const [activeTab, setActiveTab] = useState<'logMeal' | 'viewMeals' | 'budgetMeal'>('logMeal');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // State to control sidebar collapse

  // Form state variables
  const [mealName, setMealName] = useState('');
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [budget, setBudget] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", unit: "", quantity: "", price: "" }
  ]);

  const [savedMeals, setSavedMeals] = useState<Meal[]>([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [budgetSuggestions, setBudgetSuggestions] = useState<Meal[]>([]);

  const handleInputChange = (index: number, field: keyof Ingredient, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredientRow = () => {
    setIngredients([...ingredients, { name: "", unit: "", quantity: "", price: "" }]);
  };

  const removeIngredientRow = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleSaveMeal = () => {
    // Validate mandatory inputs
    if (!mealName || !description || ingredients.some(ingredient => !ingredient.name || !ingredient.unit || !ingredient.quantity || !ingredient.price)) {
      setError('Please fill in all mandatory fields for the meal and ingredients.');
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
    setIngredients([{ name: "", unit: "", quantity: "", price: "" }]);
    setCalories('');
    setBudget('');
    setError('');
    setSuccessMessage('Meal saved successfully!');
  };

  const generateBudgetMealSuggestion = async () => {
    setBudgetSuggestions([]);
    await fetch("http://localhost:5000/meal/budget", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budget,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setBudgetSuggestions([]);
          throw new Error("An error occurred. Please try again.");
        }
      })
      .then((data) => {
        setBudgetSuggestions(data);
      });
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
            <li
              className={`cursor-pointer mb-4 flex items-center ${
                activeTab === 'budgetMeal' ? 'text-[var(--focus-ring-color)] font-bold' : ''
              }`}
              onClick={() => setActiveTab('budgetMeal')}
            >
              <FiList className="text-xl" />
              {!sidebarCollapsed && <span className="ml-3">Budget Meal</span>}
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

                {/* Ingredients Table */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ingredients <span className="text-red-500">*</span>
                  </label>
                  <table className="w-full table-auto text-left">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Unit</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ingredients.map((ingredient, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={ingredient.name}
                              onChange={(e) => handleInputChange(index, "name", e.target.value)}
                              className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg px-2 py-1"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={ingredient.unit}
                              onChange={(e) => handleInputChange(index, "unit", e.target.value)}
                              className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg px-2 py-1"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={ingredient.quantity}
                              onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                              className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg px-2 py-1"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={ingredient.price}
                              onChange={(e) => handleInputChange(index, "price", e.target.value)}
                              className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg px-2 py-1"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <button
                              className="text-red-500 font-semibold"
                              onClick={() => removeIngredientRow(index)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="bg-[var(--button-bg-color)] text-white px-4 py-2 rounded-full hover:bg-[var(--button-hover-color)] transition-all"
                      onClick={addIngredientRow}
                    >
                      Add Ingredient
                    </button>
                  </div>
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
                        <strong>Ingredients:</strong> {meal.ingredients.map(ing => `${ing.name} (${ing.quantity} ${ing.unit})`).join(', ')}
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

          {activeTab === 'budgetMeal' && (
            <div>
              <h2 className="text-3xl font-semibold mb-6">Budget Meal</h2>
              <div className="space-y-6">
                <div className="h-80 w-4/5 bg-[#b29e97] rounded-md p-2 flex justify-center items-center overflow-scroll">
                  {budgetSuggestions.length === 0 ? (
                    <p>No suggestion generated yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {budgetSuggestions.map((meal, index) => (
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
                            <strong>Ingredients:</strong> {meal.ingredients.map(ing => `${ing.name} (${ing.quantity} ${ing.unit})`).join(', ')}
                          </p>
                          <p className="mb-2">
                            <strong>Calories:</strong> {meal.calories}
                          </p>
                          <p>
                            <strong>Budget:</strong>{' '}
                            {meal.budget !== 'N/A' ? `A$${meal.budget}` : 'N/A'}
                          </p>
                          <button
                            onClick={() => handleSaveBudgetMeal(meal)}
                            className="mt-4 bg-[var(--button-bg-color)] text-[var(--button-text-color)] py-2 px-4 rounded-full hover:bg-[var(--button-hover-color)] transition-all duration-300 font-semibold"
                          >
                            Save Meal
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Timeframe</label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value as 'monthly' | 'fortnightly')}
                    className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)]"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="fortnightly">Fortnightly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Budget (A$)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)]"
                    placeholder="Enter your budget"
                  />
                </div>
                <button
                  className="bg-[var(--button-bg-color)] text-[var(--button-text-color)] py-2 px-6 rounded-full hover:bg-[var(--button-hover-color)] transition-all duration-300 font-semibold"
                  onClick={generateBudgetMealSuggestion}
                >
                  Generate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
