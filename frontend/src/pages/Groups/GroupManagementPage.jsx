import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGroups } from "@context/GroupsContext/GroupProvider";
import RoundDashboard from "@components/Dashboard/Dashboard";
import toast from "react-hot-toast";
import Buttons from "@components/Buttons/Buttons";

import { FaBell, FaDeleteLeft } from "react-icons/fa6";
import {
  IoIosLogOut,
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
} from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

const GroupManagementPage = () => {
  const API_BASE = "https://lifesync-ufkl.onrender.com/api/groups";

  const {
    groups,
    setGroups,
    fetchTasks,
    tasksByGroup,
    markTaskComplete,
    approveTasks,
  } = useGroups();
  const { id } = useParams();
  const [selectedGroup, setSelectedGroup] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const found = groups.find((g) => g._id === id);
    setSelectedGroup(found);
  }, [groups, id]);

  useEffect(() => {
    if (selectedGroup?._id) {
      fetchTasks(selectedGroup._id);
    }
  }, [selectedGroup]);

  //delete feature (GS5)
  const handleDelete = async () => {
    if (!selectedGroup?._id) return;

    const confirmDelete = window.confirm(
      `Do you really want to delete "${selectedGroup.name}"?`
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE}/${selectedGroup._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete group");
        return;
      }

      toast.success("Group deleted successfully!");

      setGroups((prev) => prev.filter((g) => g._id !== selectedGroup._id));
      // Redirect to HomePage
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Error deleting group");
    }
  };

  //approveTasks
  const handleMarkComplete = async (taskId) => {
    try {
      await markTaskComplete(taskId);
      toast.success("Task marked complete!");
      fetchTasks(id); // reload tasks for this group
    } catch (err) {
      toast.error("Failed to update task");
    }
  };
  const handleApproved = async (taskId) => {
    try {
      await approveTasks(taskId);
      toast.success("Task approved!");
      fetchTasks(id);
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  if (!selectedGroup) {
    navigate("/");
    return null;
  }

  const tasks = tasksByGroup[id] || [];

  return (
    <section className="ls-page">
      {/* navbar */}
      <div
        className="bg-[var(--ls-group)] w-full h-[83px] flex justify-between justify-items-center items-center"
        style={{ padding: "40px" }}
      >
        <span style={{ fontSize: "24px", fontWeight: "bold" }}>
          {selectedGroup.name}
        </span>
        <div className="flex w-[10%] justify-between  justify-items-center items-center">
          <Link to={`/group/edit/${selectedGroup._id}`}>
            <FaRegEdit
              className="w-[24px] h-[24px] cursor-pointer"
              style={{ color: "#24a95e" }}
            />
          </Link>
          <FaBell
            className="w-[24px] h-[24px] cursor-pointer "
            style={{ color: "#24a95e" }}
          />
          <IoIosLogOut
            className="w-[24px] h-[24px] cursor-pointer"
            style={{ color: "#d20429" }}
          />
          <FaDeleteLeft
            className="w-[24px] h-[24px] cursor-pointer"
            style={{ color: "#d20429" }}
            onClick={handleDelete}
          />
        </div>
      </div>

      {/* content */}
      <div className="grid grid-cols-4">
        <div
          className="col-span-3 h-screen grid grid-cols-2"
          style={{ gap: 20 }}
        >
          {/* Dashboard */}
          <div className="col-span-1" style={{ padding: 20 }}>
            <RoundDashboard tasks={selectedGroup.members ?? []} size="100%" />
          </div>

          {/* tasks */}
          <div
            className="col-span-1 bg-[var(--ls-primary)]"
            style={{ padding: 20 }}
          >
            <div className="flex justify-between items-center">
              <span
                style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
              >
                Tasks/Habits
              </span>
              <Link to={`/task/create/${selectedGroup._id}`}>
                <Buttons text="Add Tasks" type="button" variant="secondary" />
              </Link>
            </div>

            {/* tasks display */}
            <div style={{ marginTop: 4, width: "100%" }}>
              {tasks.length === 0 ? (
                <p style={{ color: "white", opacity: 0.8 }}>No tasks yet.</p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-white rounded shadow"
                    style={{ marginTop: 10, marginBottom: 10 }}
                  >
                    {/* tasks name + approve/reject */}
                    <div className="flex justify-between ">
                      <div
                        style={{
                          color: "white",
                          fontSize: 20,
                          fontWeight: "Bold",
                        }}
                      >
                        {`${task.title} (${task.assignedTo})`}
                        <Link to={`/task/edit/${task._id}`}>
                          <FaRegEdit
                            className="w-[24px] h-[24px] cursor-pointer"
                            style={{ color: "white" }}
                          />
                        </Link>
                      </div>

                      {/* completed */}
                      <div className="flex flex-col gap-4 ">
                        <span style={{ color: "white" }}>Completed?</span>
                        <div className="flex justfiy-between items-center ">
                          <IoIosCheckmarkCircle
                            className="w-[24px] h-[24px] cursor-pointer"
                            style={{ color: "white" }}
                            onClick={() => handleApproved(task._id)}
                          />
                          <IoIosCloseCircle
                            className="w-[24px] h-[24px] cursor-pointer"
                            style={{ color: "white" }}
                            onClick={() => handleReject(task._id)}
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{ color: "#F9FAFB" }}>{task.description}</div>
                    <div style={{ color: "#F9FAFB" }}>
                      Type: {task.type} | Status:
                      <span
                        style={{
                          color:
                            task.status === "Completed"
                              ? "white"
                              : task.status === "Rejected"
                              ? "red"
                              : task.status === "Pending"
                              ? "yellow"
                              : "white",
                        }}
                      >
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* member */}
          <div
            className="col-span-2"
            style={{
              backgroundColor: "#e5e7ea",
              width: "100%",
              height: "150%",
              alignSelf: "end",
              padding: 20,
            }}
          >
            <div>member</div>
          </div>
        </div>

        {/* chat section */}
        <div className="bg-[var(--ls-bg)] h-screen flex flex-col">
          {/* header */}
          <div
            className="mx-auto w-fit"
            style={{
              fontSize: "20px",
              fontWeight: "Bold",
              marginBottom: "10px",
            }}
          >
            Chat
          </div>
          {/* chat contents */}
          <div>content</div>
          <input
            type="text"
            className="mt-auto self-end bg-[var(--ls-surface-soft)] w-full h-[50px]"
            placeholder="Type a message"
          />
        </div>
      </div>
    </section>
  );
};

export default GroupManagementPage;
