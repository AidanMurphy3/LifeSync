const express = require("express");
const { createTask, getTasks, markComplete } = require("../controllers/taskController");
const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);
router.patch("/:id/complete", markComplete);

module.exports = router;
