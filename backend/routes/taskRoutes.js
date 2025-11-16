const express = require("express");
const router = express.Router();
const {getAllTasks, getTasksByGroup, getTasksByAssignedUser, getTasksByGroupAndAssignedUser} = require("../controllers/taskController.js")

//GET all tasks route
router.get("/", getAllTasks);

//GET all tasks in a specified group route
router.get("/group/:groupId", getTasksByGroup);

//GET all tasks assigned to a specify user
router.get("/user/:assignedTo", getTasksByAssignedUser);

//GET all tasks assigned to a specify user and in a specify group
router.get("/group/:groupId/user/:assignedTo", getTasksByGroupAndAssignedUser);

module.exports = router;