import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGroups } from "@context/GroupsContext/GroupProvider";
import GroupForm from "@components/GroupForm/GroupForm";

function CreateGroup() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    groupType: "",
    privacySetting: "",
  });

  const [owner, setOwner] = useState("");

  const { fetchGroups } = useGroups();

  const navigate = useNavigate();

  // Load logged-in user ID from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      setOwner(user._id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("authToken");

    if (!owner) {
      console.error("Missing userID. Cannot create group.");
      return;
    }

    const newGroup = {
      ...form,
      owner,
    };

    try {
      const res = await fetch("https://lifesync-ufkl.onrender.com/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newGroup),
      });

      const data = await res.json();
      console.log("Backend returned:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to create group");
      }

      await fetchGroups();

      navigate("/group-management");
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <section className="ls-page">
      <div className="ls-container">
        <h1>Create Group</h1>

        <GroupForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
          saving={false}
          isEdit={false}
        />
      </div>
    </section>
  );
}

export default CreateGroup;
