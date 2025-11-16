
const express = require("express");
const router = express.Router();
const {getUser, getUsersById,getUsers, deleteUser, addUser, changePermission} = require("../controllers/userController.js");

//GET all user route
router.get("/", getUsers);

//GET user by name 
router.get("/:id", getUsersById);

//GET user by name 
router.get("/:name", getUser);

//ADD user route 
router.post("/", addUser);

//DELETE user route 
router.delete("/:id", deleteUser);

//Change permission
router.post("/changePermission", changePermission);

module.exports = router;
