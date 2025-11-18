import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGroups } from "@context/GroupsContext/GroupProvider";

import { FaBell } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

const GroupManagementPage = () => {
  const { groups, setGroups } = useGroups();
  const { id } = useParams();

  const group = groups.find((g) => g._id === id);

  if (!group) {
    return <p className="p-6 text-center">Group not found.</p>;
  }
  console.log(groups);
  return (
    <section className="ls-page">
      <div
        className="bg-[var(--ls-group)] w-full h-[83px] flex justify-between justify-items-center items-center"
        style={{ padding: "40px" }}
      >
        <span style={{ fontSize: "24px", fontWeight: "bold" }}>
          {group.name}
        </span>
        <div className="flex w-[10%] justify-between  justify-items-center items-center">
          <FaBell className="w-[24px] h-[24px]" style={{ color: "#24a95e" }} />
          <IoIosLogOut
            className="w-[24px] h-[24px]"
            style={{ color: "#d20429" }}
          />
        </div>
      </div>
    </section>
  );
};

export default GroupManagementPage;
