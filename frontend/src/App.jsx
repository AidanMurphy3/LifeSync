// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

/* ------------------------------------------
   IMPORT PAGES BASED ON YOUR FOLDER STRUCTURE
------------------------------------------- */

// GROUP MANAGEMENT PAGES
import CreateGroup from "./pages/GroupManagement/CreateGroup.jsx";
import AddMembers from "./pages/GroupManagement/AddMembers.jsx";
import EditGroup from "./pages/GroupManagement/EditGroup.jsx";
import DeleteGroup from "./pages/GroupManagement/DeleteGroup.jsx";
import AssignRoles from "./pages/GroupManagement/AssignRoles.jsx";
import LeaveGroup from "./pages/GroupManagement/LeaveGroup.jsx";

// GROUP MANAGEMENT ROOT PAGE
import GroupManagementPage from "./pages/GroupManagementPage.jsx";

// TASK & HABIT PAGES
import TaskHabitPage from "./pages/TaskHabitPage.jsx";
import EditTaskHabit from "./pages/TaskHabit/EditTaskHabit.jsx";
import CreateTaskHabit from "./pages/TaskHabit/CreateTaskHabit.jsx";
import AssignTask from "./pages/TaskHabit/AssignTask.jsx";
import ApproveTaskHabit from "./pages/TaskHabit/ApproveTaskHabit.jsx";
import MemberAddTaskHabit from "./pages/TaskHabit/MemberAddTaskHabit.jsx";
import ViewerTaskStatus from "./pages/TaskHabit/ViewerTaskStatus.jsx";
import ViewMemberTasks from "./pages/TaskHabit/ViewMemberTasks.jsx";

/* ---------- HOME PAGE (dashboard) ---------- */

function HomePage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/groups");
        if (!res.ok) throw new Error("Server error");
        const data = await res.json();
        const raw = Array.isArray(data) ? data : data.groups || [];

        const mapped = raw.map((g) => ({
          id: g._id,
          name: g.name,
          description: g.description,
          category: g.groupType,
          memberCount: Array.isArray(g.members) ? g.members.length : 0,
          habitCount: Array.isArray(g.habits) ? g.habits.length : 0,
          createdAt: g.createdAt,
        }));

        setGroups(mapped);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const formatDate = (d) => {
    if (!d) return "N/A";
    const obj = new Date(d);
    if (isNaN(obj)) return "N/A";
    return obj.toLocaleDateString();
  };

  return (
    <>
      {/* hero section */}
      <section className="ls-hero">
        <div className="ls-container ls-hero-grid">
          <div className="ls-hero-text">
            <h1>Coordinate habits, tasks, and goals with your group.</h1>
            <p>
              LifeSync helps friends and teams stay organized with{" "}
              <strong>shared habits</strong> and <strong>task tracking</strong>.
            </p>
            <div className="ls-hero-actions">
              <Link to="/group/create" className="ls-btn ls-btn-primary">
                + Create Group
              </Link>
            </div>
          </div>

          <div className="ls-hero-card">
            <h2>Today at a glance</h2>
            {loading ? (
              <p>Loading…</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <>
                <ul className="ls-stats">
                  <li>
                    <span>Groups</span> <span>{groups.length}</span>
                  </li>
                  <li>
                    <span>Total Members</span>{" "}
                    <span>
                      {groups.reduce((a, b) => a + b.memberCount, 0)}
                    </span>
                  </li>
                  <li>
                    <span>Total Habits</span>{" "}
                    <span>
                      {groups.reduce((a, b) => a + b.habitCount, 0)}
                    </span>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      {/* group list */}
      <section className="ls-section">
        <div className="ls-container">
          <h2>My Groups</h2>

          {groups.length === 0 && !loading && <p>No groups yet.</p>}

          <div className="ls-groups-grid">
            {groups.map((g) => (
              <article key={g.id} className="ls-group-card">
                <div className="ls-group-header">
                  <h3>{g.name}</h3>
                  <span className="ls-badge">{g.category || "Other"}</span>
                </div>
                <p>{g.description}</p>

                <dl className="ls-group-meta">
                  <div>
                    <dt>Members</dt>
                    <dd>{g.memberCount}</dd>
                  </div>
                  <div>
                    <dt>Habits</dt>
                    <dd>{g.habitCount}</dd>
                  </div>
                  <div>
                    <dt>Created</dt>
                    <dd>{formatDate(g.createdAt)}</dd>
                  </div>
                </dl>

                <div className="ls-group-actions">
                  <button className="ls-btn ls-btn-small ls-btn-primary">
                    Open group
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- APP ROUTING ---------- */

export default function App() {
  return (
    <div className="ls-app">
      <header className="ls-header">
        <div className="ls-container ls-nav">
          <div className="ls-logo">
            Life<span>Sync</span>
          </div>

          <nav className="ls-nav-links">
            <Link to="/">Home</Link>
            <Link to="/group-management">Group Management</Link>
            <Link to="/task-habits">Task &amp; Habits</Link>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* group mgmt */}
          <Route path="/group-management" element={<GroupManagementPage />} />
          <Route path="/group/create" element={<CreateGroup />} />
          <Route path="/group/add-members" element={<AddMembers />} />
          <Route path="/group/edit" element={<EditGroup />} />
          <Route path="/group/delete" element={<DeleteGroup />} />
          <Route path="/group/assign-roles" element={<AssignRoles />} />
          <Route path="/group/leave" element={<LeaveGroup />} />

          {/* tasks/habits */}
          <Route path="/task-habits" element={<TaskHabitPage />} />
          <Route path="/task/create" element={<CreateTaskHabit />} />
          <Route path="/task/assign" element={<AssignTask />} />
          <Route path="/task/edit" element={<EditTaskHabit />} />
          <Route path="/task/approve" element={<ApproveTaskHabit />} />
          <Route path="/task/member-add" element={<MemberAddTaskHabit />} />
          <Route path="/task/member-view" element={<ViewMemberTasks />} />
          <Route path="/task/viewer" element={<ViewerTaskStatus />} />
        </Routes>
      </main>

      <footer className="ls-footer">
        <div className="ls-container ls-footer-inner">
          <p>LifeSync © 2025 – Team 4</p>
        </div>
      </footer>
    </div>
  );
}
