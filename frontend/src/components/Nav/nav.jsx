import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
import { CgProfile } from "react-icons/cg";
import { FaBell } from "react-icons/fa6";
import { useEffect, useState } from "react";

function Nav() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log(parsedUser);
      } catch (err) {
        console.error("Error parsing user from localStorage", err);
      }
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
        <nav className="flex justify-between w-[320px] text-[0.95rem] items-center gap-4">
          <Link to="/" className="nav-link">
            Home
          </Link>

          {user ? (
            // If user is logged in
            <span className="nav-link flex item-center gap-10 cursor-pointer">
              {user.name} <CgProfile className="w-[24px] h-[24px]" />
            </span>
          ) : (
            // If not logged in, show Sign Up link
            <Link
              to="/Authentication"
              className="nav-link flex items-center gap-1"
            >
              Sign Up <CgProfile />
            </Link>
          )}

          <FaBell
            className="h-[24px] w-[24px] text-[var(--ls-text-muted)] cursor-pointer"
            onClick={() => console.log("bell")}
          />
        </nav>
      </div>
    </header>
  );
}

export default Nav;
