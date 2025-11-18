import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@components/Cards/Card";
import Buttons from "../../components/Buttons/Buttons";

function HomePage() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("https://lifesync-ufkl.onrender.com/api/groups")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched groups:", data);
        setGroups(data.data);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  console.log(groups);

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
              <Buttons
                text="Join an existing group"
                type="button"
                variant="secondary"
              />
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
                <span className="ls-stat-value"></span>
              </li>
              <li>
                <span className="ls-stat-label">Avg. completion</span>
                <span className="ls-stat-value">
                  {groups.length ? Math.round(groups.length) : 0}%
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
              <button className="ls-btn ls-btn-primary">+ Create Group</button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-[30px] p-10">
            {groups.map((group) => {
              return (
                <Card
                  id={group.id}
                  groupName={group.name}
                  groupType={group.groupType}
                />
              );
            })}
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
