// src/pages/GroupManagement/EditGroup.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Same backend as CreateGroup.jsx
const API_BASE = "https://lifesync-ufkl.onrender.com/api/groups";

function EditGroup() {
  const [groups, setGroups] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    groupType: "",
    privacySetting: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // ---------- 2.d – fetch data from backend so we can edit + update view ----------
  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error("Failed to load groups from server");

        const data = await res.json();
        // backend returns { groups: [...] }
        const list = Array.isArray(data) ? data : data.groups || [];
        setGroups(list);
      } catch (err) {
        setError(err.message || "Something went wrong while loading groups.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // When user chooses a group to edit, pre-fill the form
  const handleSelectGroup = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    setSuccess("");
    setError("");

    if (!id) {
      setForm({
        name: "",
        description: "",
        groupType: "",
        privacySetting: "",
      });
      return;
    }

    const g = groups.find((grp) => (grp._id || grp.id) === id);
    if (g) {
      setForm({
        name: g.name || "",
        description: g.description || "",
        groupType: g.groupType || "",
        privacySetting: g.privacySetting || "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ---------- 2.a – Save + Cancel buttons; Save triggers server update ----------
  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedId) {
      setError("Please select a group to edit.");
      return;
    }

    if (!form.name.trim() || !form.description.trim()) {
      setError("Name and description are required.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/${selectedId}`, {
        method: "PUT", // your teammate’s editGroup API should use PUT or PATCH
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to update group on the server.");
      }

      const payload = await res.json();
      const updatedGroup = payload.data || payload.group || payload;

      // Update the local list so the view reflects the new values (2.d)
      setGroups((prev) =>
        prev.map((g) =>
          (g._id || g.id) === selectedId ? { ...g, ...updatedGroup } : g
        )
      );

      setSuccess("Group updated successfully.");
    } catch (err) {
      setError(err.message || "There was a problem saving your changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Just go back to Group Management page
    navigate("/group-management");
  };

  return (
    <section className="ls-page">
      <div className="ls-container space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h1>Edit Group (GS4 – 2.a & 2.d)</h1>
          <button
            type="button"
            className="ls-btn ls-btn-small ls-btn-outline"
            onClick={handleCancel}
          >
            ← Back to Group Management
          </button>
        </div>

        <p className="ls-section-subtitle">
          Choose a group, change its details, then click{" "}
          <strong>Save changes</strong>. This will call the editGroup API and
          update the backend and the on-screen data.
        </p>

        {loading && <p>Loading groups…</p>}
        {error && <p className="ls-error">{error}</p>}
        {success && <p className="ls-success">{success}</p>}

        {!loading && groups.length === 0 && !error && (
          <p>No groups found. Create a group first, then come back to edit it.</p>
        )}

        {!loading && groups.length > 0 && (
          <form onSubmit={handleSave} className="space-y-6">
            {/* Select which group to edit */}
            <div>
              <label className="block mb-2 font-medium text-gray-200">
                Select group to edit
              </label>
              <select
                value={selectedId}
                onChange={handleSelectGroup}
                className="w-full border border-gray-700 bg-[#050816] rounded-lg px-4 py-2"
              >
                <option value="">-- Choose a group --</option>
                {groups.map((g) => (
                  <option key={g._id || g.id} value={g._id || g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Only show the form if a group is selected */}
            {selectedId && (
              <>
                {/* Name */}
                <div>
                  <label className="block mb-2 font-medium text-gray-200">
                    Group name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-gray-700 bg-[#050816] rounded-lg px-4 py-2"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block mb-2 font-medium text-gray-200">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border border-gray-700 bg-[#050816] rounded-lg px-4 py-2 h-28"
                    required
                  />
                </div>

                {/* Category / Group type + Privacy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-200">
                      Category / Group type
                    </label>
                    <select
                      name="groupType"
                      value={form.groupType}
                      onChange={handleChange}
                      className="w-full border border-gray-700 bg-[#050816] rounded-lg px-4 py-2"
                    >
                      <option value="">Choose…</option>
                      <option value="Personal">Personal</option>
                      <option value="Family">Family</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-200">
                      Privacy setting
                    </label>
                    <select
                      name="privacySetting"
                      value={form.privacySetting}
                      onChange={handleChange}
                      className="w-full border border-gray-700 bg-[#050816] rounded-lg px-4 py-2"
                    >
                      <option value="">Choose…</option>
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>
                </div>

                {/* Buttons – 2.a */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="ls-btn ls-btn-primary"
                    disabled={saving}
                  >
                    {saving ? "Saving…" : "Save changes"}
                  </button>
                  <button
                    type="button"
                    className="ls-btn ls-btn-outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

export default EditGroup;
