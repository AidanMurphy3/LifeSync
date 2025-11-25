import { createContext, useState, useEffect, useContext } from "react";
export const sidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user");

    if (!token) {
      setIsOpen(true); // show sidebar if NOT logged in
    } else {
      setIsOpen(false); // hide sidebar if logged in
    }
  }, []);

  //login logout
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // <-- updates UI instantly
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null); // <-- updates UI instantly
  };

  return (
    <sidebarContext.Provider value={{ isOpen, setIsOpen, user, login, logout }}>
      {children}
    </sidebarContext.Provider>
  );
};
export const useSidebar = () => useContext(sidebarContext);
