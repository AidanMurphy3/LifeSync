import React, { useState, useEffect, useContext } from "react";
import Buttons from "@components/Buttons/Buttons";
import { sidebarContext } from "@context/Sidebar/SidebarProvider";

const TaskForm = ({
  mode = "create", // "create" | "edit"
  initialData = {}, // for edit mode
  members = [], // list of users in the group (dropdown)
  onSubmit, // function(taskData)
  onCancel,
}) => {
  const { user } = useContext(sidebarContext);

  // ---- form state ----
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Task");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  // ---- fill form on edit ----
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setType(initialData.type || "Task");
      setAssignedTo(initialData.assignedTo || "");
      setDueDate(
        initialData.dueDate ? initialData.dueDate.substring(0, 10) : ""
      );
    }
  }, [initialData]);

  // ---- handle submit ----
  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      type,
      assignedTo,
      dueDate,
    };

    onSubmit(taskData);
  };

  return (
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

      {/* Type */}
      <div>
        <label className="font-semibold">Type</label>
        <div className="flex gap-4 mt-2">
          <label>
            <input
              type="radio"
              name="type"
              value="Task"
              checked={type === "Task"}
              onChange={() => setType("Task")}
            />{" "}
            Task
          </label>

          <label>
            <input
              type="radio"
              name="type"
              value="Habit"
              checked={type === "Habit"}
              onChange={() => setType("Habit")}
            />{" "}
            Habit
          </label>
        </div>
      </div>

      {/* Assign To */}
      <div>
        <label className="font-semibold">Assign To</label>
        <select
          className="w-full p-3 rounded border"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        >
          <option value="">Select a member</option>
          {user && <option value={user._id}>{user.name || "Yourself"}</option>}

          {/* Show group members (avoid duplicating yourself) */}
          {members
            .filter((m) => m._id !== user?._id)
            .map((m) => (
              <option key={m._id} value={m._id}>
                {m.username}
              </option>
            ))}
        </select>
      </div>

      {/* Due Date */}
      <div>
        <label className="font-semibold">Due Date</label>
        <input
          type="date"
          className="w-full p-3 rounded border"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Buttons
          type="submit"
          text={mode === "edit" ? "Save Changes" : "Create Task"}
          variant="primary"
        />

        <Buttons
          type="button"
          text="Cancel"
          variant="return"
          onClick={onCancel}
        />
      </div>
    </form>
  );
};

export default TaskForm;
