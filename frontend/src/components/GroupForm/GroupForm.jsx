import React from "react";

function GroupForm({ form, setForm, onSubmit, onCancel, saving, isEdit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Group Name */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Group Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28"
        />
      </div>

      {/* Group Type */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">Category</label>
        <select
          name="groupType"
          value={form.groupType}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Choose a group type</option>
          <option value="Personal">Personal</option>
          <option value="Family">Family</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Privacy */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">Privacy</label>
        <select
          name="privacySetting"
          value={form.privacySetting}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Choose privacy</option>
          <option value="Private">Private</option>
          <option value="Public">Public</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="ls-btn bg-[var(--ls-accent-red)]"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="ls-btn ls-btn-primary"
          disabled={saving}
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create group"}
        </button>
      </div>
    </form>
  );
}

export default GroupForm;
