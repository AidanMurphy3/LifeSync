import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateGroup() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [groupType, setGroupType] = useState("");
  const [privacySetting, setPrivacySetting] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Group Created:", {
      name,
      description,
      category,
    });

    const newGroup = {
      name,
      description,
      groupType,
      privacySetting,
    };

    try {
      const res = await fetch("https://lifesync-ufkl.onrender.com/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGroup),
      });

      if (!res.ok) {
        throw new Error("Failed to create group");
      }

      const data = await res.json();
      console.log("Group saved to backend:", data);

      // redirect after success
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/*  Group Type */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a group type</option>
              <option value="health">Health & Fitness</option>
              <option value="study">Study Group</option>
              <option value="work">Work / Team</option>
              <option value="family">Family</option>
              <option value="habit">Habit Tracking</option>
              <option value="other">Other</option>
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
            {/* Cancel */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="ls-btn bg-[var(--ls-accent-red)]"
            >
              Cancel
            </button>

            {/* Save */}
            <button type="submit" className="ls-btn ls-btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateGroup;
