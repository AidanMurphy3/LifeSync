import React, { useState, useEffect, useContext } from "react";
import { sidebarContext } from "@context/Sidebar/SidebarProvider";
import toast from "react-hot-toast";

const API_BASE = "https://lifesync-ufkl.onrender.com/api";

const AddFriends = () => {
  const { user } = useContext(sidebarContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sentRequests, setSentRequests] = useState([]);

  const loadAllUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`);
      const data = await res.json();

      console.log("friends", data.data);

      const filtered = data.data.filter((u) => u._id !== user._id);

      return filtered; // returns array of users
    } catch (err) {
      console.error("Failed to load users:", err);
      return [];
    }
  };

  loadAllUsers();

  useEffect(() => {
    if (!user?._id) return;

    // Load already sent requests
    async function loadUser() {
      const res = await fetch(`${API_BASE}/users/${user._id}`);
      const data = await res.json();
      setSentRequests(data.data.friendRequestsSent || []);
    }
    loadUser();
  }, [user]);

  // SEARCH USERS
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/users`);
      const data = await res.json();
      const users = data.data;

      // Filter locally because /users?name= doesn't exist yet
      const filtered = users.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) &&
          u._id !== user._id
      );

      setResults(filtered);
    } catch (err) {
      console.error(err);
      toast.error("Failed to search users");
    }

    setLoading(false);
  };

  // SEND FRIEND REQUEST
  const sendRequest = async (recipientId) => {
    try {
      const res = await fetch(`${API_BASE}/users/${recipientId}/send-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Friend request sent!");
      setSentRequests((prev) => [...prev, recipientId]);
    } catch (err) {
      toast.error(err.message || "Failed to send request");
    }
  };

  return (
    <section className="ls-page p-10">
      <h1 className="text-3xl font-bold mb-6">Add Friends</h1>

      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search users by name..."
          className="border p-3 rounded w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="ls-btn ls-btn-primary"
          disabled={loading}
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        {results.length === 0 && !loading && (
          <p className="opacity-70">No users found.</p>
        )}

        {results.map((u) => (
          <div
            key={u._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{u.name}</p>
              <p className="text-sm opacity-70">{u.email}</p>
            </div>

            {sentRequests.includes(u._id) ? (
              <span className="text-green-600 font-semibold">Request Sent</span>
            ) : (
              <button
                className="ls-btn ls-btn-secondary"
                onClick={() => sendRequest(u._id)}
              >
                Add Friend
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddFriends;
