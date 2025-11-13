
const express = require("express");
const router = express.Router();
const {getUsers,getUsers, deleteUser, addUser} = require("../controllers/userController.js");

//GET all user route
router.get("/", getUsers);

//GET user by name 
router.get("/:name", getUsers);

//ADD user route 
router.post("/", addUser);

//DELETE user route 
router.delete("/:id", deleteUser);

module.exports = router;
