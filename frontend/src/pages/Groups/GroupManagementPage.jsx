import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGroups } from "@context/GroupsContext/GroupProvider";
import RoundDashboard from "@components/Dashboard/Dashboard";

import { FaBell } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

const GroupManagementPage = () => {
  const { groups, setGroups } = useGroups();
  const { id } = useParams();
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const found = groups.find((g) => g._id === id);
    setSelectedGroup(found);
  }, [groups, id]);

  console.log(selectedGroup);

  if (!selectedGroup) {
    return <p className="p-6 text-center">Group not found.</p>;
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
