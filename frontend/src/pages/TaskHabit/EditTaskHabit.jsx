import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGroups } from "@context/GroupsContext/GroupProvider";
import TaskForm from "@components/TaskForm/TaskForm";
import toast from "react-hot-toast";

const EditTaskHabit = () => {
  const { id: taskId } = useParams();
  const { tasksByGroup, groups, updateTask, fetchTasks } = useGroups();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // ---- LOAD GROUP INFO BASED ON TASK.groupId ----
  useEffect(() => {
    if (task) {
      const foundGroup = groups.find((g) => g._id === task.groupId);
      setSelectedGroup(foundGroup || null);
    }
  }, [task, groups]);

  useEffect(() => {
    for (const gid in tasksByGroup) {
      const t = tasksByGroup[gid]?.find((x) => x._id === taskId);
      if (t) {
        setTask(t);
        return;
      }
    }
  }, [tasksByGroup, taskId]);

  if (!task) return <div>Loading...</div>;
  if (!selectedGroup) return <div>Loading Members...</div>;

  const handleSave = async (updates) => {
    try {
      await updateTask(task.groupId, taskId, updates);
      toast.success("Task updated!");
      fetchTasks(task.groupId);
      navigate(`/group-management/${task.groupId}`);
    } catch (err) {
      toast.error(err.message || "Failed to update task");
    }
  };

  return (
    <section className="ls-page" style={{ padding: 8 }}>
      <h1 className="text-2xl font-bold mb-6">Edit Task / Habit</h1>

      <TaskForm
        mode="edit"
        initialData={task}
        members={selectedGroup.members} // later you can pass group members
        onSubmit={handleSave}
        onCancel={() => navigate(-1)}
      />
    </section>
  );
};

export default EditTaskHabit;
