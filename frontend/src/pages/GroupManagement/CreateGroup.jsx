import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGroups } from "@context/GroupsContext/GroupProvider";

function CreateGroup() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [groupType, setGroupType] = useState("");
  const [privacySetting, setPrivacySetting] = useState("");
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
      name,
      description,
      groupType,
      privacySetting,
      owner,
    };

    console.log("Sending to backend:", newGroup);

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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Group Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Group Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Fitness Team, Study Group"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Describe your group purpose..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Group Type */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Category
            </label>
            <select
              value={groupType}
              onChange={(e) => setGroupType(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a group type</option>
              <option value="Personal">Personal</option>
              <option value="Family">Family</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Privacy Setting */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Privacy Setting
            </label>
            <select
              value={privacySetting}
              onChange={(e) => setPrivacySetting(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose privacy setting</option>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4 pt-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="ls-btn bg-[var(--ls-accent-red)]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="ls-btn ls-btn-primary"
              disabled={!owner}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateGroup;
