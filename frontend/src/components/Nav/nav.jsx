import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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
          <Link to="/group-management" className="nav-link">
            Group Management
          </Link>
          <Link to="/task-habits" className="nav-link">
            Task & Habits
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
