const Task = require("../models/taskModel");

const getAllTasks = async() => {
    const tasks = await Task.find();
    return tasks;
}

const getTasksByGroup = async(groupId) => {
    const tasks = await Task.find({groupId: groupId});
    return tasks;
}

const getTasksByAssignedUser = async(assignedTo) => {
    const tasks = await Task.find({assignedTo: assignedTo});
    return tasks;
}

const getTasksByGroupAndAssignedUser = async(groupId, assignedTo) => {
    const tasks = await Task.find({
        groupId: groupId, 
        assignedTo: assignedTo
    });
    return tasks;
}