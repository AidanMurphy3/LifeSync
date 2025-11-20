import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGroups } from "@context/GroupsContext/GroupProvider";
import RoundDashboard from "@components/Dashboard/Dashboard";
import toast from "react-hot-toast";

import { FaBell, FaDeleteLeft } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

const GroupManagementPage = () => {
  const API_BASE = "https://lifesync-ufkl.onrender.com/api/groups";

  const { groups, setGroups } = useGroups();
  const { id } = useParams();
  const [selectedGroup, setSelectedGroup] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const found = groups.find((g) => g._id === id);
    setSelectedGroup(found);
  }, [groups, id]);

  console.log(selectedGroup);

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

  if (!selectedGroup) {
    navigate("/");
    return null;
  }
  console.log(groups);
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
          <Link to={`/group/edit/${selectedGroup._id}`} className="nav-link">
            <FaRegEdit
              className="w-[24px] h-[24px] cursor-pointer"
              style={{ color: "#24a95e" }}
            />
          </Link>
          <FaBell
            className="w-[24px] h-[24px] cursor-pointer"
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
          className="col-span-3 h-screen grid grid-cols-4"
          style={{ padding: "15px" }}
        >
          <RoundDashboard tasks={selectedGroup.members ?? []} />
        </div>

        <div className="bg-[var(--ls-group)] h-screen flex flex-col">
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
          {/* chat */}
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
