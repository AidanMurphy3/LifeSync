import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGroups } from "@context/GroupsContext/GroupProvider";
import toast from "react-hot-toast";
import Buttons from "@components/Buttons/Buttons";

const CreateTaskHabit = () => {
  const { groupId } = useParams();
  const { addTask, groups } = useGroups();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const currentGroup = groups.find((g) => g._id === groupId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskType, setTaskType] = useState("Task");
  const [assignedTo, setAssignedTo] = useState(user?._id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Task title is required");
      return;
    }

    const taskData = {
      title,
      description,
      groupId, // assign to this group
      createdBy: user._id, // required
      assignedTo, // optional, you can change this later
      type: taskType, // required by your schema
      status: "Pending", // required by your schema
      dueDate: dueDate || null,
      progress: 0,
      aiSuggested: false,
    };

    try {
      await addTask(groupId, taskData);
      toast.success("Task created!");
      navigate(`/group-management/${groupId}`); // go back to group page
    } catch (err) {
      toast.error(err.message || "Failed to create task");
    }
  };

  return (
    <section className="ls-page" style={{ padding: 8 }}>
      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        {/* Title */}
        <div>
          <label className="font-semibold">Task Title</label>
          <input
            type="text"
            className="w-full p-3 rounded border"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="w-full p-3 rounded border"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the task"
            required
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="font-semibold">Due Date</label>
          <input
            type="text"
            className="w-full p-3 rounded border"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            pattern="\d{2}-\d{2}"
            placeholder="MM-DD"
            maxLength={5}
            required
          />
        </div>

        {/* Task Type Radio Buttons */}
        <div>
          <label className="font-semibold">Type</label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="taskType"
                value="Task"
                checked={taskType === "Task"}
                onChange={(e) => setTaskType(e.target.value)}
              />
              Task
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="taskType"
                value="Habit"
                checked={taskType === "Habit"}
                onChange={(e) => setTaskType(e.target.value)}
              />
              Habit
            </label>
          </div>
        </div>

        {/* Assigned To Dropdown */}
        <div>
          <label className="font-semibold">Assign To</label>
          <select
            className="w-full p-3 rounded border mt-2"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            {/* default: yourself */}
            <option value={user?._id}>Myself</option>

            {/* List other members of the group */}
            {currentGroup?.members?.map((memberId) =>
              memberId !== user?._id ? (
                <option key={memberId} value={memberId}>
                  {memberId}
                </option>
              ) : null
            )}
          </select>
        </div>

        {/* Buttons */}
        <div style={{ marginTop: 20 }}>
          <Buttons type="submit" text="Create Task" variant="primary" />
          <Buttons
            type="button"
            onClick={() => navigate(-1)}
            text="return"
            variant="return"
          />
        </div>
      </form>
    </section>
  );
};

export default CreateTaskHabit;
