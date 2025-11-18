import { Link } from "react-router-dom";
import { sidebarContext } from "@context/Sidebar/SidebarProvider";
import { useContext } from "react";
import "./sidebar.css";

function Sidebar() {
  const { isOpen } = useContext(sidebarContext);
  return (
    <>
      {/* Blur overlay */}
      <div
        className="fixed inset-0 bg-[var(--overlay-bg)] size-full z-[100]"
        style={{ backdropFilter: "var(--ls-overlay-blur)" }}
      ></div>

      {/* Bottom Panel */}
      <div className="panel">
        <Link
          to="/Authentication"
          className="nav-link items-center"
          onClick={() => setIsOpen(false)}
        >
          Please Log in to explore full features
        </Link>
      </div>
    </>
  );
}

export default Sidebar;
