const express = require("express");
const router = express.Router();
const { 
    createTask, 
    getTasks, 
    getTaskById,
    updateTask,
    deleteTask,
    markComplete, 
    approveTask, 
    assignTask 
} = require("../controllers/taskController"); 

// --- Core CRUD Operations ---

// GET /api/tasks 
// READ ALL tasks. Uses query parameters for filtering (e.g., ?groupId=...&assignedTo=...)
router.get("/", getTasks); 

// POST /api/tasks
// CREATE new task
router.post("/", createTask);

// GET /api/tasks/:id
// READ ONE task by ID
router.get("/:id", getTaskById); 

// PATCH /api/tasks/:id
// UPDATE task (General update)
router.patch("/:id", updateTask); 
// router.put("/:id", updateTask); // Use PATCH for partial updates, or PUT for full replacement

// DELETE /api/tasks/:id
// DELETE task
router.delete("/:id", deleteTask); 

// --- Utility/Workflow Operations ---

// PATCH /api/tasks/:id/complete
// Mark task as complete
router.patch("/:id/complete", markComplete);

// PATCH /api/tasks/:id/approve
// Approve a task
router.patch("/:id/approve", approveTask);

// PATCH /api/tasks/:id/assign
// Assign a task to a user. Assumes the user ID is in the request body.
router.patch("/:id/assign", assignTask);

module.exports = router;