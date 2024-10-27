const users = require("../models/users"); // Import the users model

// Function to retrieve user information by username
async function getUserByUsername(username) {
  try {
    // This assumes that users.js has a getUserByUsername method implemented.
    const user = await users.getUserByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error in getUserByUsername:", error.message);
    throw error; // Re-throw the error for higher-level handling
  }
}

module.exports = {
  getUserByUsername,
};
