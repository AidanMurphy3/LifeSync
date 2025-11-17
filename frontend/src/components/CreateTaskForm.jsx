import { useState } from "react";

export default function CreateTaskForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!category.trim()) newErrors.category = "Category is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    console.log({ name, description, category });

    setName("");
    setDescription("");
    setCategory("");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h1 className="text-2xl font-semibold mb-4">Create Task</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className={`w-full border px-3 py-2 rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Task name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            rows={3}
            className={`w-full border px-3 py-2 rounded ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            className={`w-full border px-3 py-2 rounded ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category (Work, School, etc.)"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
