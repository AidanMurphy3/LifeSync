import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@components/Cards/Card";

function HomePage() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Roommate Chores",
      role: "Owner",
      description: "Weekly cleaning, trash rotation, dishes, and grocery runs.",
      members: 4,
      tasks: 9,
      completion: 74,
    },
    {
      id: 2,
      name: "Fitness Challenge",
      role: "Member",
      description: "Shared workout habits, step goals, and weekly check-ins.",
      members: 6,
      tasks: 5,
      completion: 89,
    },
    {
      id: 3,
      name: "Trip Planning",
      role: "Viewer",
      description:
        "Packing checklist, bookings, and travel tasks – read-only access.",
      members: 5,
      tasks: 12,
      completion: 61,
    },
  ]);

  const [newGroup, setNewGroup] = useState({
    name: "",
    role: "Owner",
    description: "",
    members: 1,
    tasks: 0,
    completion: 0,
  });

  const handleNewGroupChange = (e) => {
    const { name, value } = e.target;
    setNewGroup((prev) => ({
      ...prev,
      [name]:
        name === "members" || name === "tasks" || name === "completion"
          ? Number(value)
          : value,
    }));
  };

  const handleAddGroup = (e) => {
    e.preventDefault();
    if (!newGroup.name.trim()) return;

    const nextId = groups.length ? Math.max(...groups.map((g) => g.id)) + 1 : 1;

    setGroups((prev) => [
      ...prev,
      {
        ...newGroup,
        id: nextId,
      },
    ]);

    setNewGroup({
      name: "",
      role: "Owner",
      description: "",
      members: 1,
      tasks: 0,
      completion: 0,
    });
  };

  const handleDeleteGroup = (id) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="ls-hero">
        <div className="ls-container ls-hero-grid">
          <div className="ls-hero-text">
            <h1>Coordinate habits, tasks, and goals with your group.</h1>
            <p>
              LifeSync helps roommates, friends, and teams{" "}
              <strong>track shared habits</strong>,{" "}
              <strong>assign tasks fairly</strong>, and{" "}
              <strong>stay accountable</strong> with clear dashboards and smart
              suggestions.
            </p>

            <div className="ls-hero-actions">
              {/* Link to the page that will implement GS1 */}
              <Link className="ls-btn ls-btn-primary" to="/group/create">
                + Create Group
              </Link>
              <button className="ls-btn ls-btn-ghost">
                Join an existing group
              </button>
            </div>
          </div>

          <div className="ls-hero-card">
            <h2>Today at a glance</h2>
            <ul className="ls-stats">
              <li>
                <span className="ls-stat-label">Active groups</span>
                <span className="ls-stat-value">{groups.length}</span>
              </li>
              <li>
                <span className="ls-stat-label">Tasks (total)</span>
                <span className="ls-stat-value">
                  {groups.reduce((sum, g) => sum + g.tasks, 0)}
                </span>
              </li>
              <li>
                <span className="ls-stat-label">Avg. completion</span>
                <span className="ls-stat-value">
                  {groups.length
                    ? Math.round(
                        groups.reduce((sum, g) => sum + g.completion, 0) /
                          groups.length
                      )
                    : 0}
                  %
                </span>
              </li>
            </ul>
            <p className="ls-small">
              These values update in real time based on the groups below.
            </p>
          </div>
        </div>
      </section>

      {/* Group display */}
      <section className="ls-section">
        <div className="ls-container">
          <div className="flex items-center justify-between mb-4">
            <h2>My Groups</h2>
            <Link to="/group/create">
              <button className="ls-btn ls-btn-primary">+ Add Group</button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-[30px] p-10">
            <Card />
            <Card />
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="ls-section ls-section-alt">
        <div className="ls-container">
          <div className="ls-section-header">
            <h2>Quick actions</h2>
          </div>
          <div className="ls-quick-grid">
            <div className="ls-quick-card">
              <h3>Go to Group Management page</h3>
              <p>
                All Iteration 1 group-owner stories (create/edit/delete group,
                add members, assign roles) live on this page.
              </p>
              <Link
                className="ls-btn ls-btn-small ls-btn-primary"
                to="/group-management"
              >
                Open Group Management
              </Link>
            </div>

            <div className="ls-quick-card">
              <h3>Go to Task &amp; Habit page</h3>
              <p>
                All Iteration 1 task and habit stories (create/assign/edit, view
                status) live on this page.
              </p>
              <Link
                className="ls-btn ls-btn-small ls-btn-primary"
                to="/task-habits"
              >
                Open Task &amp; Habit Management
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
