import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGroups } from "@context/GroupsContext/GroupProvider";
import TaskForm from "@components/TaskForm/TaskForm";
import toast from "react-hot-toast";

const CreateTaskHabit = () => {
  const { groupId } = useParams();
  const { addTask, groups } = useGroups();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const selectedGroup = groups.find((g) => g._id === groupId);

  console.log(selectedGroup);

  const handleCreate = async (taskData) => {
    try {
      await addTask(groupId, {
        ...taskData,
        groupId,
        createdBy: user._id,
        status: "Pending",
        progress: 0,
        aiSuggested: false,
      });

      toast.success("Task created!");
      navigate(`/group-management/${groupId}`);
    } catch (err) {
      toast.error(err.message || "Failed to create task");
    }
  };

  return (
    <section className="ls-page" style={{ padding: 8 }}>
      <h1 className="text-2xl font-bold mb-6">Create New Task / Habit</h1>

      <TaskForm
        mode="create"
        members={selectedGroup.members} // replace with selectedGroup.members if you want
        onSubmit={handleCreate}
        initialData={{ assignedTo: user._id }}
        onCancel={() => navigate(-1)}
      />
    </section>
  );
};

export default CreateTaskHabit;
