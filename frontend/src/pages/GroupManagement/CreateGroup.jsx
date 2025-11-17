import React, { useState } from "react";
// Import necessary components from react-router-dom
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useNavigate, 
  Link 
} from "react-router-dom"; 
import { Loader2, PlusCircle, XCircle, Home } from 'lucide-react';

// NOTE: All components for this single-file application are defined here.

// Mock authentication helper. 
// CRITICAL: This is used to simulate a token required by the groupController.js 
// for identifying the group owner securely.
const useAuthToken = () => {
  // Replace this placeholder with a function that retrieves the actual user token 
  const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; 
  return mockToken; 
};


// 1. The main component for creating a new group
export default function CreateGroup() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // Using groupType as the consistent state variable for the backend schema
  const [groupType, setGroupType] = useState(""); 
  const [privacySetting, setPrivacySetting] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 
  const authToken = useAuthToken(); // Get the authorization token

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Basic client-side validation check
    if (!name || !groupType || !privacySetting) {
      setError("Please fill in all required fields (Name, Group Type, Privacy Setting).");
      setIsLoading(false);
      return;
    }

    // Prepare the payload based on the Group Schema fields
    const newGroup = {
      name,
      description,
      groupType,
      privacySetting,
    };

    try {
      if (!authToken) {
        throw new Error("Authentication token missing. Please log in.");
      }

      const res = await fetch("https://lifesync-ufkl.onrender.com/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // CRITICAL: Include the Authorization header for backend owner identification
          "Authorization": `Bearer ${authToken}`, 
        },
        body: JSON.stringify(newGroup),
      });

      if (!res.ok) {
        // Attempt to parse the server's error message
        const errorData = await res.json();
        throw new Error(errorData.message || `Failed with status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Group saved to backend:", data);

      // Redirect after success
      navigate("/group-management");
    } catch (err) {
      console.error("Error creating group:", err);
      setError(err.message || "An unknown error occurred during creation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex justify-center py-12">
      <div className="w-full max-w-lg mx-4 p-8 bg-white shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
          <PlusCircle className="inline-block w-6 h-6 mr-2 text-blue-600" />
          Create New Group
        </h1>

        {/* Error Message Display */}
        {error && (
          <div className="flex items-center p-4 mb-4 text-red-800 bg-red-100 border border-red-200 rounded-lg">
            <XCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Group Name */}
          <div>
            <label htmlFor="groupName" className="block mb-2 font-medium text-gray-700">
              Group Name <span className="text-red-500">*</span>
            </label>
            <input
              id="groupName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              placeholder="e.g. Fitness Team, Study Group"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-2 font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Describe your group purpose... (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 resize-none"
            />
          </div>

          {/* Group Type (Category) */}
          <div>
            <label htmlFor="groupType" className="block mb-2 font-medium text-gray-700">
              Group Type <span className="text-red-500">*</span>
            </label>

            <select
              id="groupType"
              value={groupType}
              onChange={(e) => setGroupType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              required
            >
              <option value="" disabled>Choose a group type</option>
              {/* Values map to common categories */}
              <option value="Health">Health & Fitness</option>
              <option value="Study">Study Group / Education</option>
              <option value="Work">Work / Team</option>
              <option value="Family">Family / Household</option>
              <option value="Habit">Habit Tracking</option>
              <option value="Project">Project / Initiative</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Privacy Setting */}
          <div>
            <label htmlFor="privacySetting" className="block mb-2 font-medium text-gray-700">
              Privacy Setting <span className="text-red-500">*</span>
            </label>
            <select
              id="privacySetting"
              value={privacySetting}
              onChange={(e) => setPrivacySetting(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              required
            >
              <option value="" disabled>Choose privacy setting</option>
              <option value="Private">Private (Invitation Only)</option>
              <option value="Public">Public (Anyone can find and join)</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4 pt-4 mt-6">
            {/* Cancel */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition duration-150"
              disabled={isLoading}
            >
              Cancel
            </button>

            {/* Save */}
            <button 
              type="submit" 
              className="px-6 py-2 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition duration-150 disabled:bg-blue-400 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Group"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

// 2. Mock page for redirection
const GroupManagementPage = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
    <div className="text-center p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-green-600 mb-3">Group Created Successfully!</h2>
      <p className="text-gray-700 mb-6">This is the mock Group Management page you were redirected to.</p>
      <Link 
        to="/" 
        className="px-6 py-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition duration-150 inline-flex items-center"
      >
        <Home className="w-5 h-5 mr-2" />
        Go Back to Form
      </Link>
    </div>
  </div>
);