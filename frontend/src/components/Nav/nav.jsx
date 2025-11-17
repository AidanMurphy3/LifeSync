import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
import { CgProfile } from "react-icons/cg";
import { FaBell } from "react-icons/fa6";
import { useEffect, useState } from "react";

function Nav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  return (
    <header className="bg-[var(--ls-surface)] border-b border-[var(--ls-border)] shadow-sm h-[60px] flex items-center">
      <div className="max-w-[1120px] h-full w-full mx-auto px-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="font-extrabold text-[36px] tracking-wide text-[var(--ls-text-muted)]">
          Life<span className="text-[var(--ls-text-muted)]">Sync</span>
        </div>

        {/* NAV */}
        <nav className="flex justify-between w-[320px] text-[0.95rem]">
          <Link to="/" className="nav-link">
            Home
          </Link>
          {username ? (
            <span>Hi, {username}</span>
          ) : (
            <Link to="/Authentication" className="nav-link">
              Sign Up <CgProfile />
            </Link>
          )}
          <FaBell
            className="h-[24px] w-[24px] text-[var(--ls-text-muted)] cursor-pointer"
            onClick={() => {
              console.log("bell");
            }}
          />
        </nav>
      </div>
    </header>
  );
}

export default Nav;
