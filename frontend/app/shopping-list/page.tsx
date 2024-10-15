"use client";

import Header from "@/components/ui/header";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

// Define the type for the items in the shopping list
interface ShoppingItem {
  name: string;
  quantity: string;
  unit: string;
  price: string;
  checked: boolean;
}
interface DecodedToken {
  id: string;
  username: string;
  name: string;
}

export default function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  const [isModifying, setIsModifying] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [originalItems, setOriginalItems] = useState<ShoppingItem[] | null>(
    null
  );
  useEffect(() => {
    const decodedToken = jwtDecode(
      localStorage.getItem("token")!
    ) as DecodedToken;

    fetch("http://localhost:5000/shopping-list?id=" + decodedToken.id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("An error occurred. Please try again.");
        }
      })
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred. Please try again.");
      });
  }, []);

  // Handle adding a new ingredient
  const handleAddIngredient = () => {
    if (isAdding) {
      // Cancel adding mode
      const updatedItems = items.filter((_, i) => i !== editableRowIndex);
      setItems(updatedItems);
      setIsAdding(false);
      setEditableRowIndex(null);
    } else {
      // Start adding mode
      setIsAdding(true);
      // Add a new empty row
      setItems([
        ...items,
        { name: "", quantity: "", unit: "", price: "", checked: false },
      ]);
      setEditableRowIndex(items.length); // Set the new row as editable
    }
  };

  // Handle modifying mode
  const handleModify = () => {
    if (isAdding) {
      // Do not allow modifying while adding
      return;
    }

    if (isModifying) {
      // Exiting modifying mode without saving changes
      if (originalItems) {
        setItems(originalItems); // Restore original items
      }
      setIsModifying(false);
      setOriginalItems(null);
    } else {
      // Entering modifying mode
      setOriginalItems([...items]); // Save a copy of items before modifying
      setIsModifying(true);
    }
  };

  // Handle saving choices (for both adding and modifying)
  const handleSaveChoices = () => {
    // Validate mandatory fields before saving
    if (isAdding && editableRowIndex !== null) {
      // Only validate the new item
      const newItem = items[editableRowIndex];
      if (!newItem.name || !newItem.quantity || !newItem.unit) {
        alert("Error: Name, Quantity, and unit are mandatory fields.");
        return;
      }
    } else if (isModifying) {
      // Validate all items during modifying mode
      const hasEmptyFields = items.some(
        (item) => !item.name || !item.quantity || !item.unit
      );
      if (hasEmptyFields) {
        alert("Error: Name, Quantity, and unit are mandatory fields.");
        return;
      }
    }
    // Save changes
    setIsModifying(false);
    setIsAdding(false);
    setEditableRowIndex(null);
    setOriginalItems(null); // Clear original items
  };

  // Handle removing a row
  const handleRemoveRow = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    if (isAdding && index === editableRowIndex) {
      // If the row being added is removed, exit adding mode
      setIsAdding(false);
      setEditableRowIndex(null);
    }
  };

  // Handle check toggle
  const toggleCheck = (index: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  // Handle table cell change
  const handleChange = (index: number, field: string, value: string) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
  };

  // Handle checkout
  const handleCheckout = () => {
    const selectedItems = items.filter((item) => item.checked && item.price);
    if (selectedItems.length === 0) {
      alert("Please select items with prices to checkout.");
      return;
    }

    // Calculate total price
    const totalPrice = selectedItems.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + (isNaN(price) ? 0 : price);
    }, 0);

    alert(`Your total bill is $${totalPrice.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-[var(--background-color)] text-[var(--foreground-color)] flex flex-col">
      {/* Include Header */}
      <Header />

      {/* Main Content Wrapper */}
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center w-full p-4 max-w-4xl">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Shopping List
          </h2>

          {/* Buttons */}
          <div className="flex justify-center mb-6 space-x-4">
            <button
              className={`py-2 px-6 rounded-full transition-all duration-300 ${
                isAdding
                  ? "bg-red-500 text-white hover:bg-red-600" // Red when canceling add
                  : "bg-[var(--button-bg-color)] text-[var(--button-text-color)] hover:bg-[var(--button-hover-color)]" // Use project colors
              }`}
              onClick={handleAddIngredient}
            >
              {isAdding ? "Don't Add" : "Add Ingredient"}
            </button>
            <button
              className={`py-2 px-6 rounded-full transition-all duration-300 ${
                isModifying
                  ? "bg-red-500 text-white hover:bg-red-600" // Red when canceling modify
                  : "bg-[var(--button-bg-color)] text-[var(--button-text-color)] hover:bg-[var(--button-hover-color)]"
              } ${isAdding ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleModify}
              disabled={isAdding}
            >
              {isModifying ? "Don't Modify" : "Modify"}
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-[var(--container-bg-color)] rounded-lg text-[var(--foreground-color)] table-auto">
              <thead>
                <tr className="text-left bg-[var(--table-header-bg-color)] text-[var(--table-header-text-color)]">
                  {isModifying && <th className="px-4 py-2 w-1/12">Remove</th>}
                  <th className="px-4 py-2 w-1/5">Ingredient Name</th>
                  <th className="px-4 py-2 w-1/5">Quantity</th>
                  <th className="px-4 py-2 w-1/5">unit</th>
                  <th className="px-4 py-2 w-1/5">Price ($)</th>
                  <th className="px-4 py-2 w-1/5 text-center">Select</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 &&
                  items.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-[var(--table-border-color)]"
                    >
                      {isModifying && (
                        <td className="px-4 py-2 text-center">
                          <button
                            className="bg-transparent hover:bg-red-600 text-white rounded-full p-2 transition-all duration-300"
                            onClick={() => handleRemoveRow(index)}
                          >
                            <FaTrash size={16} />
                          </button>
                        </td>
                      )}
                      <td className="px-4 py-2 align-top">
                        {isModifying ||
                        (isAdding && index === editableRowIndex) ? (
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) =>
                              handleChange(index, "name", e.target.value)
                            }
                            className="w-full bg-transparent border-b border-[var(--input-border-color)] text-[var(--foreground-color)] focus:outline-none px-2 h-10"
                            placeholder="Name"
                          />
                        ) : (
                          item.name
                        )}
                      </td>
                      <td className="px-4 py-2 align-top">
                        {isModifying ||
                        (isAdding && index === editableRowIndex) ? (
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={(e) =>
                              handleChange(index, "quantity", e.target.value)
                            }
                            className="w-full bg-transparent border-b border-[var(--input-border-color)] text-[var(--foreground-color)] focus:outline-none px-2 h-10"
                            placeholder="Quantity"
                          />
                        ) : (
                          item.quantity
                        )}
                      </td>
                      <td className="px-4 py-2 align-top">
                        {isModifying ||
                        (isAdding && index === editableRowIndex) ? (
                          <select
                            value={item.unit}
                            onChange={(e) =>
                              handleChange(index, "unit", e.target.value)
                            }
                            className="w-full bg-transparent border-b border-[var(--input-border-color)] text-[var(--foreground-color)] focus:outline-none h-10 px-2"
                          >
                            <option value="">Select</option>
                            <option value="units">units</option>
                            <option value="kg">kg</option>
                            <option value="g">g</option>
                            <option value="mg">mg</option>
                            <option value="L">L</option>
                            <option value="mL">mL</option>
                          </select>
                        ) : (
                          item.unit
                        )}
                      </td>
                      <td className="px-4 py-2 align-top">
                        {isModifying ||
                        (isAdding && index === editableRowIndex) ? (
                          <input
                            type="text"
                            value={item.price}
                            onChange={(e) =>
                              handleChange(index, "price", e.target.value)
                            }
                            className="w-full bg-transparent border-b border-[var(--input-border-color)] text-[var(--foreground-color)] focus:outline-none px-2 h-10"
                            placeholder="Price"
                          />
                        ) : item.price ? (
                          `$${item.price}`
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleCheck(index)}
                          className="h-4 w-4 text-[var(--checkbox-color)] bg-[var(--checkbox-bg-color)] border-[var(--checkbox-border-color)] rounded"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              className="py-2 px-6 rounded-full transition-all duration-300 bg-green-500 text-white hover:bg-green-600"
              onClick={handleSaveChoices}
            >
              Save Choices
            </button>
            <button
              className="py-2 px-6 rounded-full transition-all duration-300 bg-[var(--button-bg-color)] text-[var(--button-text-color)] hover:bg-[var(--button-hover-color)]"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
