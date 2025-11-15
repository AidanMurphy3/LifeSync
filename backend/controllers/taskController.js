const TaskService = require("../services/taskService");

// get all tasks
const getAllTasks = async(req, res) => {
    try{
        const tasks = await TaskService.getAllTasks();
        res.status(201).json({ 
            message: 'Get tasks successfully!', 
            data: tasks
        });
    }catch(error){
        res.status(500).json({ 
            message: 'Failed to get tasks!', 
            error: error.message 
        });
    }
}

// get tasks by group
const getTasksByGroup = async(req, res) => {
    try{
        const tasks = await TaskService.getTasksByGroup(req.params.groupId);
        res.status(201).json({ 
            message: 'Get tasks successfully!', 
            data: tasks
        });
    }catch(error){
        res.status(500).json({ 
            message: 'Failed to get tasks!', 
            error: error.message 
        });
    }
}

// get tasks by assigned user
const getTasksByAssignedUser = async(req, res) => {
    try{
        const tasks = await TaskService.getTasksByGroup(req.params.assignedTo);
        res.status(201).json({ 
            message: 'Get tasks successfully!', 
            data: tasks
        });
    }catch(error){
        res.status(500).json({ 
            message: 'Failed to get tasks!', 
            error: error.message 
        });
    }
}

// get tasks by group and assigned user
const getTasksByGroupAndAssignedUser = async(req, res) => {
    try{
        const tasks = await TaskService.getTasksByGroup(req.params.groupId, req.params.assignedTo);
        res.status(201).json({ 
            message: 'Get tasks successfully!', 
            data: tasks
        });
    }catch(error){
        res.status(500).json({ 
            message: 'Failed to get tasks!', 
            error: error.message 
        });
    }
}

module.exports = {getAllTasks, getTasksByGroup, getTasksByAssignedUser, getTasksByGroupAndAssignedUser};