const TaskService = require("../services/taskService");
const Task = require("../models/taskModel.js");

// Create a new task
const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const assignTask = async (req, res) => {
  try {
    const { taskId, userId } = req.body;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Invalid taskId' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    // Find the task
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Assign the task
    task.assignedTo = userId;

    // Optional: Reset status or progress when reassigned
    task.status = 'Pending';
    task.progress = 0;

    await task.save();

    return res.status(200).json({ message: 'Task assigned successfully', task });
  } catch (error) {
    console.error('Error assigning task:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark task as complete
const markComplete = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.markComplete();
    res.status(200).json({ message: "Task marked as complete", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve task
const approveTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.approve();
    res.status(200).json({ message: "Task approved", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




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

module.exports = {
  createTask,
  getTasks,
  getAllTasks,
  getTasksByGroup,
  getTasksByAssignedUser,
  getTasksByGroupAndAssignedUser,
  getTaskById,
  updateTask,
  deleteTask,
  markComplete,
  approveTask,
  assignTask
};
