const mongoose = require('mongoose');
const TaskService = require("../services/taskService");
const Task = require("../models/taskModel.js");


// Helper function for consistent error handling and Mongoose ID check
const handleControllerError = (res, error, defaultMessage, status = 500) => {
    // 400 Bad Request for invalid Mongoose ID format
    if (error.kind === 'ObjectId' || (error.name === 'CastError' && error.path === '_id')) {
        return res.status(400).json({ message: 'Invalid ID format provided.', error: error.message });
    }
    // 400 Bad Request for validation errors
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation failed.', error: error.message });
    }
    // Default 500 Server Error
    res.status(status).json({ message: defaultMessage, error: error.message });
};

// ----------------------------------------------------------------------
// C R E A T E
// ----------------------------------------------------------------------

// Create a new task (C)
const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json({ message: 'Task created successfully', data: task });
    } catch (error) {
        handleControllerError(res, error, 'Failed to create task.', 400);
    }
};

// ----------------------------------------------------------------------
// R E A D 
// ----------------------------------------------------------------------

// Get tasks (Handles filtering by Group and/or User via Query Params)
const getTasks = async (req, res) => {
    try {
        const { groupId, assignedTo } = req.query; 
        
        let tasks;
        
        if (groupId && assignedTo) {
            tasks = await TaskService.getTasksByGroupAndAssignedUser(groupId, assignedTo);
        } else if (groupId) {
            tasks = await TaskService.getTasksByGroup(groupId);
        } else if (assignedTo) {
            tasks = await TaskService.getTasksByAssignedUser(assignedTo);
        } 
        res.status(200).json({ 
            message: 'Tasks retrieved successfully!', 
            data: tasks 
        });
    } catch (error) {
        handleControllerError(res, error, 'Failed to retrieve tasks.', 500);
    }
};

// Get a single task by ID (R)
const getTaskById = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format provided.' });
    }
    
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json({ message: "Task retrieved successfully", data: task });
    } catch (error) {
        handleControllerError(res, error, 'Error retrieving task.', 500);
    }
};

// ----------------------------------------------------------------------
// U P D A T E
// ----------------------------------------------------------------------

// Update a task (U)
const updateTask = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format provided.' });
    }
    
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        
        if (!updatedTask) return res.status(404).json({ message: "Task not found" });
        
        res.status(200).json({ message: 'Task updated successfully', data: updatedTask });
    } catch (error) {
        handleControllerError(res, error, 'Failed to update task.', 400);
    }
};

// Assign task to a user
const assignTask = async (req, res) => {
    const { taskId, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(taskId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid Task ID or User ID format.' });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { assignedTo: userId, status: 'Pending', progress: 0 },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json({ message: 'Task assigned successfully', data: updatedTask });
    } catch (error) {
        handleControllerError(res, error, 'Error assigning task.', 500);
    }
};

// Mark task as complete (U helper)
const markComplete = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format provided.' });
    }
    
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        await task.markComplete(); 
        res.status(200).json({ message: "Task marked as complete", data: task });
    } catch (error) {
        handleControllerError(res, error, 'Failed to mark task complete.', 500);
    }
};

// Approve task (U helper)
const approveTask = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format provided.' });
    }
    
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        await task.approve(); 
        res.status(200).json({ message: "Task approved", data: task });
    } catch (error) {
        handleControllerError(res, error, 'Failed to approve task.', 500);
    }
};

// ----------------------------------------------------------------------
// D E L E T E
// ----------------------------------------------------------------------

// Delete a task (D)
const deleteTask = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format provided.' });
    }
    
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: "Task not found" });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        handleControllerError(res, error, 'Failed to delete task.', 500);
    }
};


module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    markComplete,
    approveTask,
    assignTask
};