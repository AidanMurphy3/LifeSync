import { useState } from "react";
import { Link } from "react-router-dom";

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
      {/* <div className="p-4">
        <DeleteConfirmation />
        <NotifyUI />
        <LeaveConfirmation />
      </div> */}
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
      MY GROUPS
      <section className="ls-section">
        <div className="ls-container">
          <div className="ls-section-header">
            <h2>My Groups</h2>
            <p className="ls-section-subtitle">
              Add new groups or manage existing ones. Cards update instantly as
              you change the data.
            </p>
          </div>

          <div className="ls-my-groups-grid">
            {/* LEFT: FORM CARD */}
            <div className="ls-card ls-group-form-card">
              <h3>Create / update a group</h3>
              <p className="ls-section-subtitle">
                Quick mockup form for Iteration 1. Values here only affect the
                dashboard on this page.
              </p>

              <form className="ls-group-form" onSubmit={handleAddGroup}>
                {/* row 1: group name + role + button */}
                <div className="ls-group-form-row">
                  <div className="ls-field ls-field-grow">
                    <label>
                      Group name
                      <input
                        type="text"
                        name="name"
                        placeholder="Study group, Trip planning…"
                        value={newGroup.name}
                        onChange={handleNewGroupChange}
                        required
                      />
                    </label>
                  </div>

                  <div className="ls-field">
                    <label>
                      Role
                      <select
                        name="role"
                        value={newGroup.role}
                        onChange={handleNewGroupChange}
                      >
                        <option>Owner</option>
                        <option>Member</option>
                        <option>Viewer</option>
                      </select>
                    </label>
                  </div>

                  <button
                    className="ls-btn ls-btn-small ls-btn-primary"
                    type="submit"
                  >
                    + Add Group
                  </button>
                </div>

                {/* row 2: description */}
                <div className="ls-group-form-row">
                  <div className="ls-field ls-field-full">
                    <label>
                      Description
                      <textarea
                        name="description"
                        placeholder="Short description of the group"
                        value={newGroup.description}
                        onChange={handleNewGroupChange}
                        rows={2}
                      />
                    </label>
                  </div>
                </div>

                {/* row 3: members / tasks / completion */}
                <div className="ls-group-form-row">
                  <div className="ls-field">
                    <label>
                      Members
                      <input
                        type="number"
                        name="members"
                        min="1"
                        value={newGroup.members}
                        onChange={handleNewGroupChange}
                      />
                    </label>
                  </div>

                  <div className="ls-field">
                    <label>
                      Tasks
                      <input
                        type="number"
                        name="tasks"
                        min="0"
                        value={newGroup.tasks}
                        onChange={handleNewGroupChange}
                      />
                    </label>
                  </div>

                  <div className="ls-field">
                    <label>
                      Completion %
                      <input
                        type="number"
                        name="completion"
                        min="0"
                        max="100"
                        value={newGroup.completion}
                        onChange={handleNewGroupChange}
                      />
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* RIGHT: GROUP CARDS GRID */}
            <div className="ls-groups-grid">
              {groups.map((group) => (
                <article key={group.id} className="ls-group-card">
                  <div className="ls-group-header">
                    <h3>{group.name}</h3>
                    <span
                      className={
                        group.role === "Member"
                          ? "ls-badge ls-badge-secondary"
                          : group.role === "Viewer"
                          ? "ls-badge ls-badge-viewer"
                          : "ls-badge"
                      }
                    >
                      {group.role}
                    </span>
                  </div>

                  <p className="ls-group-desc">
                    {group.description || "No description provided."}
                  </p>

                  <dl className="ls-group-meta">
                    <div>
                      <dt>Members</dt>
                      <dd>{group.members}</dd>
                    </div>
                    <div>
                      <dt>Active tasks</dt>
                      <dd>{group.tasks}</dd>
                    </div>
                    <div>
                      <dt>Completion rate</dt>
                      <dd>{group.completion}%</dd>
                    </div>
                  </dl>

                  <div className="ls-group-actions">
                    <button className="ls-btn ls-btn-small ls-btn-primary">
                      Open group
                    </button>
                    <button className="ls-btn ls-btn-small">
                      View members
                    </button>
                    <button
                      type="button"
                      className="ls-btn ls-btn-small ls-btn-danger"
                      onClick={() => handleDeleteGroup(group.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
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
