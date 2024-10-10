// app/components/ProfilePage.tsx

"use client"; // Client-side component

import { useState } from "react";
import Select, { MultiValue, ActionMeta } from 'react-select';
import Header from '../components/ui/header'; // Adjust the path based on your project structure

// Define the type for your options
interface OptionType {
  value: string;
  label: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [preference, setPreference] = useState("");
  const [allergies, setAllergies] = useState<OptionType[]>([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<OptionType[]>([]);
  const [budget, setBudget] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [exerciseLevel, setExerciseLevel] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Options for dropdowns
  const preferenceOptions: OptionType[] = [
    { value: "spicy", label: "Spicy" },
    { value: "sweet", label: "Sweet" },
    { value: "savory", label: "Savory" },
    { value: "sour", label: "Sour" },
    { value: "bitter", label: "Bitter" },
  ];

  const allergyOptions: OptionType[] = [
    { value: "milk", label: "Milk" },
    { value: "peanuts", label: "Peanuts" },
    { value: "shellfish", label: "Shellfish" },
    { value: "soy", label: "Soy" },
    { value: "eggs", label: "Eggs" },
    { value: "wheat", label: "Wheat" },
    { value: "tree_nuts", label: "Tree nuts" },
    { value: "fish", label: "Fish" },
    { value: "sesame", label: "Sesame" },
    { value: "gluten", label: "Gluten" },
    { value: "lactose", label: "Lactose" },
  ];

  const dietaryRestrictionOptions: OptionType[] = [
    { value: "gluten_intolerance", label: "Gluten Intolerance" },
    { value: "vegan", label: "Vegan" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "pescatarian", label: "Pescatarian" },
    { value: "kosher", label: "Kosher" },
    { value: "halal", label: "Halal" },
    { value: "low_carb", label: "Low Carb" },
    { value: "keto", label: "Ketogenic" },
    { value: "paleo", label: "Paleo" },
  ];

  const exerciseLevelOptions: OptionType[] = [
    { value: "sedentary", label: "Sedentary (Little or no exercise)" },
    { value: "light", label: "Light (Exercise 1-3 times/week)" },
    { value: "moderate", label: "Moderate (Exercise 4-5 times/week)" },
    { value: "active", label: "Active (Daily exercise or intense exercise 3-4 times/week)" },
    { value: "very_active", label: "Very Active (Intense exercise 6-7 times/week)" },
    { value: "extra_active", label: "Extra Active (Very intense exercise daily, or physical job)" },
  ];

  // Input validation for the budget field (allowing decimals)
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow numbers and decimal points
    if (/^\d*\.?\d*$/.test(value)) {
      setBudget(value);
      setError("");
    } else {
      setError("Invalid budget format");
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow numbers and decimal points
    if (/^\d*\.?\d*$/.test(value)) {
      setHeight(value);
      setError("");
    } else {
      setError("Invalid height format");
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow numbers and decimal points
    if (/^\d*\.?\d*$/.test(value)) {
      setWeight(value);
      setError("");
    } else {
      setError("Invalid weight format");
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setSuccessMessage("");
  };

  // Function to handle the onChange event for allergies
  const handleAllergyChange = (
    newValue: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    setAllergies(newValue as OptionType[]);
  };

  // Function to handle the onChange event for dietary restrictions
  const handleDietaryRestrictionChange = (
    newValue: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    setDietaryRestrictions(newValue as OptionType[]);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!name || !budget || !height || !weight) {
      setError("Name, Budget, Height, and Weight are required fields");
      setSuccessMessage("");
      return;
    }

    // Clear the error and show success message
    setError("");
    setSuccessMessage("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[var(--background-color)] w-full">
      <Header />
      <div className="flex items-center justify-center mt-16">
        <div className="w-full p-8 max-w-md">
          <h2 className="text-3xl font-semibold text-center text-[var(--foreground-color)] mb-6">
            Profile
          </h2>

          {/* Profile Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-color)] mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg focus-within:ring-2 focus-within:ring-[var(--focus-ring-color)] h-12">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    className="w-full bg-transparent border-none text-[var(--foreground-color)] px-4 py-2 focus:outline-none"
                    style={{
                      height: "100%",
                    }}
                  />
                </div>
              </div>

              {/* Height and Weight Fields */}
              <div className="flex space-x-4">
                {/* Height Field */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[var(--foreground-color)] mb-2">
                    Height (cm) <span className="text-red-500">*</span>
                  </label>
                  <div className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg focus-within:ring-2 focus-within:ring-[var(--focus-ring-color)] h-12">
                    <input
                      type="text"
                      placeholder="Enter your height"
                      value={height}
                      onChange={handleHeightChange}
                      disabled={!isEditing}
                      className="w-full bg-transparent border-none text-[var(--foreground-color)] px-4 py-2 focus:outline-none"
                      style={{
                        height: "100%",
                      }}
                    />
                  </div>
                </div>

                {/* Weight Field */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[var(--foreground-color)] mb-2">
                    Weight (kg) <span className="text-red-500">*</span>
                  </label>
                  <div className="w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg focus-within:ring-2 focus-within:ring-[var(--focus-ring-color)] h-12">
                    <input
                      type="text"
                      placeholder="Enter your weight"
                      value={weight}
                      onChange={handleWeightChange}
                      disabled={!isEditing}
                      className="w-full bg-transparent border-none text-[var(--foreground-color)] px-4 py-2 focus:outline-none"
                      style={{
                        height: "100%",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Preference Dropdown */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-color)] mb-2">
                  Preference
                </label>
                <div
                  className={`w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg focus-within:ring-2 focus-within:ring-[var(--focus-ring-color)] h-auto ${
                    !isEditing && "cursor-not-allowed"
                  }`}
                >
                  <Select
                    name="preference"
                    options={preferenceOptions}
                    className="w-full text-[var(--foreground-color)] bg-transparent"
                    classNamePrefix="select"
                    value={
                      preference
                        ? preferenceOptions.find((option) => option.value === preference)
                        : null
                    }
                    onChange={(option) => setPreference(option?.value || "")}
                    isDisabled={!isEditing}
                    placeholder="Select a Preference"
                    styles={customStyles}
                  />
                </div>
              </div>

              {/* Exercise Level Dropdown */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-color)] mb-2">
                  Exercise Level
                </label>
                <div
                  className={`w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg focus-within:ring-2 focus-within:ring-[var(--focus-ring-color)] h-auto ${
                    !isEditing && "cursor-not-allowed"
                  }`}
                >
                  <Select
                    name="exerciseLevel"
                    options={exerciseLevelOptions}
                    className="w-full text-[var(--foreground-color)] bg-transparent"
                    classNamePrefix="select"
                    value={
                      exerciseLevel
                        ? exerciseLevelOptions.find((option) => option.value === exerciseLevel)
                        : null
                    }
                    onChange={(option) => setExerciseLevel(option?.value || "")}
                    isDisabled={!isEditing}
                    placeholder="Select your exercise level"
                    styles={customStyles}
                  />
                </div>
              </div>

              {/* Allergy Multi-Select Dropdown */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-color)] mb-2">
                  Allergies
                </label>
                <div
                  className={`w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg focus-within:ring-2 focus-within:ring-[var(--focus-ring-color)] h-auto ${
                    !isEditing && "cursor-not-allowed"
                  }`}
                >
                  <Select
                    isMulti
                    name="allergies"
                    options={allergyOptions}
                    className="w-full text-[var(--foreground-color)] bg-transparent"
                    classNamePrefix="select"
                    value={allergies}
                    onChange={isEditing ? handleAllergyChange : undefined}
                    placeholder="Select allergies"
                    closeMenuOnSelect={false}
                    isDisabled={!isEditing}
                    styles={customStyles}
                  />
                </div>
              </div>

              {/* Dietary Restriction Multi-Select Dropdown */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-color)] mb-2">
                  Dietary Restrictions
                </label>

                <div
                  className={`w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg focus-within:ring-2 focus-within:ring-[var(--focus-ring-color)] h-auto ${
                    !isEditing && "cursor-not-allowed"
                  }`}
                >
                  <Select
                    isMulti
                    name="dietaryRestrictions"
                    options={dietaryRestrictionOptions}
                    className="w-full text-[var(--foreground-color)] bg-transparent"
                    classNamePrefix="select"
                    value={dietaryRestrictions}
                    onChange={
                      isEditing ? handleDietaryRestrictionChange : undefined
                    }
                    placeholder="Select dietary restrictions"
                    closeMenuOnSelect={false}
                    isDisabled={!isEditing}
                    styles={customStyles}
                  />
                </div>
              </div>

              {/* Budget Field */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-color)] mb-2">
                  Budget (A$) <span className="text-red-500">*</span>
                </label>
                <div className="w-full flex items-center bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-lg focus-within:ring-2 focus-within:ring-[var(--focus-ring-color)] h-12">
                  <span className="pl-4 pr-2 text-[var(--foreground-color)]">A$</span>
                  <input
                  type="text"
                  placeholder="Enter budget"
                  value={budget}
                  onChange={handleBudgetChange}
                  disabled={!isEditing}
                  className="flex items-center w-full mt-3.5 px-5 bg-transparent border-none text-white focus:outline-none h-full"
                />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Success Message */}
            {successMessage && (
              <p className="text-green-500 text-sm">{successMessage}</p>
            )}

            {/* Buttons: Edit & Confirm */}
            <div className="flex justify-between items-center mt-6 space-x-4">
              <button
                type="button"
                onClick={handleEdit}
                className="bg-[var(--button-bg-color)] text-[var(--button-text-color)] py-2 px-6 rounded-full hover:bg-[var(--button-hover-color)] transition-all duration-300 font-semibold"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isEditing}
                className={`py-2 px-6 rounded-full font-semibold transition-all duration-300 ${
                  isEditing
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Custom styles for react-select components
const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--input-bg-color)",
    borderColor: "var(--input-border-color)",
    minHeight: "48px",
    color: "var(--foreground-color)",
    boxShadow: "none",
    "&:hover": {
      borderColor: "var(--focus-ring-color)",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--input-bg-color)",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "var(--focus-ring-color)"
      : "var(--input-bg-color)",
    color: state.isFocused ? "white" : "var(--foreground-color)",
    "&:hover": {
      backgroundColor: "var(--focus-ring-color)",
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--focus-ring-color)",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "white",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "white",
    "&:hover": {
      backgroundColor: "var(--input-border-color)",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "var(--foreground-color)",
  }),
};
