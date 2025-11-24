const express = require("express");
const router = express.Router();
const {
  getUser,
  getUsersById,
  getUsers,
  deleteUser,
  addUser,
  changePermission,
  updateUser, // Assuming you have an updateUser function for general updates
} = require("../controllers/userController.js");

// --- READ Operations ---

// GET all users
router.get("/", getUsers);

// GET user by Name (FIX: Use a specific path segment /name/ to avoid conflict with /:id)
router.get("/name/:name", getUser);

// GET user by ID (Standard unique identifier lookup)
router.get("/:id", getUsersById);

// --- CUD Operations ---

// ADD user (C - Create)
router.post("/sign-up", addUser);

// UPDATE user (General update, using PATCH for partial updates)
router.patch("/:id", updateUser); // Assumes you have an updateUser function

// Change permission (U - Specific Update using PATCH/PUT on the user ID)
// PATCH is appropriate for modifying a single attribute like permission.
router.patch("/:id/permission", changePermission);

// DELETE user
router.delete("/:id", deleteUser);

module.exports = router;
