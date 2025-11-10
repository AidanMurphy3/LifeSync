
const express = require("express");
const router = express.Router();
const {getAllGroups, addGroup, deleteGroup} = require("../controllers/groupController.js")

//GET all users route
router.get("/", getAllGroups);

//ADD users route
router.post("/", addGroup);

//DELETE users route
router.delete("/:id", deleteGroup);

module.exports = router;
