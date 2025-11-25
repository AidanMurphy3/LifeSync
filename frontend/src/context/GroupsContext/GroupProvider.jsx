import { createContext, useState, useEffect, useContext } from "react";
import { useSidebar } from "@context/Sidebar/SidebarProvider";

export const GroupContext = createContext();
const API_BASE = "https://lifesync-ufkl.onrender.com/api/groups";

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [groupsError, setGroupsError] = useState(null);
  const { user } = useSidebar();

  //fetching groups
  const fetchGroups = async () => {
    try {
      setLoadingGroups(true);
      setGroupsError(null);

      if (!user) {
        setGroups([]); // user not logged in → no groups
        setLoadingGroups(false);
        return;
      }

      const res = await fetch(`${API_BASE}?userId=${user._id}`);
      const data = await res.json();
      console.log("Fetched groups:", data);

      setGroups(data.data || []);
    } catch (err) {
      console.error("Error fetching groups:", err);
      setGroupsError("Failed to load groups");
    } finally {
      setLoadingGroups(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [user]);

  console.log(groups);

  //---------------------------
  //TASK FUNCTIONS
  //---------------------------

  const [tasksByGroup, setTasksByGroup] = useState({});

  const fetchTasks = async (groupId) => {
    try {
      const res = await fetch(
        `https://lifesync-ufkl.onrender.com/api/tasks?groupId=${groupId}`
      );
      const data = await res.json();

      console.log("SERVER RESPONSE", data.data);

      setTasksByGroup((prev) => ({
        ...prev,
        [groupId]: data.data,
      }));

      return data;
    } catch (err) {
      console.error("Failed to load tasks:", err);
      return [];
    }
  };

  useEffect(() => {
    if (groups.length > 0) {
      groups.forEach((g) => {
        fetchTasks(g._id);
      });
    }
  }, [groups]);

  console.log(tasksByGroup);

  const addTask = async (groupId, taskData) => {
    const res = await fetch(`https://lifesync-ufkl.onrender.com/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    setTasksByGroup((prev) => ({
      ...prev,
      [groupId]: [...(prev[groupId] || []), data],
    }));

    return data;
  };

  const updateTask = async (groupId, taskId, updates) => {
    const res = await fetch(
      `https://lifesync-ufkl.onrender.com/api/tasks/${taskId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      }
    );

    const data = await res.json();

    setTasksByGroup((prev) => ({
      ...prev,
      [groupId]: prev[groupId].map((t) => (t._id === taskId ? data : t)),
    }));
  };

  const deleteTask = async (groupId, taskId) => {
    const res = await fetch(`${API_BASE}/${groupId}/tasks/${taskId}`, {
      method: "DELETE",
    });

    setTasksByGroup((prev) => ({
      ...prev,
      [groupId]: prev[groupId].filter((t) => t._id !== taskId),
    }));
  };

  const markTaskComplete = async (taskId) => {
    const res = await fetch(
      `https://lifesync-ufkl.onrender.com/api/tasks/${taskId}/complete`,
      { method: "PATCH" }
    );
    const data = await res.json();
    return data.data;
  };

  const approveTasks = async (taskId) => {
    const res = await fetch(
      `https://lifesync-ufkl.onrender.com/api/tasks/${taskId}/approve`,
      { method: "PATCH", headers: { "Content-Type": "application/json" } }
    );
    // const data = await res.json();
    // if (!res.ok) {
    //   backend error message handling
    //   throw new Error(data.message || "Failed to approve task");
    // }

    // return data.data;

    const text = await res.text(); // get raw response first
    console.log("Raw response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("JSON parse error:", err);
      throw new Error("Server returned invalid JSON");
    }

    if (!res.ok) {
      console.error("SERVER ERROR:", data);
      throw new Error(data.message || "Failed to approve task");
    }

    return data.data;
  };

  return (
    <GroupContext.Provider
      value={{
        //groups
        groups,
        setGroups,
        loadingGroups,
        groupsError,
        fetchGroups,

        //tasks
        fetchTasks,
        tasksByGroup,
        addTask,
        updateTask,
        deleteTask,
        markTaskComplete,
        approveTasks,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => useContext(GroupContext);
