import { createContext, useState, useEffect, useContext } from "react";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [groupsError, setGroupsError] = useState(null);

  const fetchGroups = async () => {
    try {
      setLoadingGroups(true);
      setGroupsError(null);

      const user = localStorage.getItem("user");

      if (!user) {
        setGroups([]); // user not logged in → no groups
        setLoadingGroups(false);
        return;
      }

      const res = await fetch("https://lifesync-ufkl.onrender.com/api/groups");
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
  }, []);

  return (
    <GroupContext.Provider
      value={{ groups, setGroups, loadingGroups, groupsError, fetchGroups }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => useContext(GroupContext);
