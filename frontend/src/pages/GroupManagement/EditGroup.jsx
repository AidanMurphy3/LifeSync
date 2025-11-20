// src/pages/GroupManagement/EditGroup.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GroupForm from "@components/GroupForm/GroupForm";
import { useGroups } from "@context/GroupsContext/GroupProvider";

const API_BASE = "https://lifesync-ufkl.onrender.com/api/groups";

function EditGroup() {
  const { id } = useParams(); // The group ID from the URL
  const navigate = useNavigate();
  const { fetchGroups } = useGroups(); // optional, to refresh list after save

  const [form, setForm] = useState({
    name: "",
    description: "",
    groupType: "",
    privacySetting: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load ONLY this specific group's data
  useEffect(() => {
    const loadGroup = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const res = await fetch(`${API_BASE}/${id}`, {
          headers: authToken
            ? { Authorization: `Bearer ${authToken}` }
            : undefined,
        });

        if (!res.ok) throw new Error("Failed to fetch group details.");

        const data = await res.json();
        console.log("EditGroup GET response:", data);

        const g = data.group || data.data || data;

        setForm({
          name: g.name || "",
          description: g.description || "",
          groupType: g.groupType || "",
          privacySetting: g.privacySetting || "",
        });
      } catch (err) {
        setError(err.message || "Failed to load group.");
      } finally {
        setLoading(false);
      }
    };

    loadGroup();
  }, [id]);

  // Save updated group
  const handleSave = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const authToken = localStorage.getItem("authToken");

      console.log("Sending update payload:", form);

      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      console.log("EditGroup PUT response:", result);

      if (!res.ok) {
        throw new Error(result.message || "Failed to update group.");
      }

      // Refresh global groups (if you use them elsewhere)
      if (fetchGroups) {
        await fetchGroups();
      }

      // Go back to previous page (e.g., Group Management)
      navigate(-1);
    } catch (err) {
      setError(err.message || "Error saving changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading group...</p>;

  return (
    <section className="ls-page">
      <div className="ls-container space-y-6">
        <h1>Edit Group</h1>

        {error && <p className="ls-error">{error}</p>}

        <GroupForm
          form={form}
          setForm={setForm}
          onSubmit={handleSave}
          onCancel={() => navigate(-1)}
          saving={saving}
          isEdit={true}
        />
      </div>
    </section>
  );
}

export default EditGroup;
