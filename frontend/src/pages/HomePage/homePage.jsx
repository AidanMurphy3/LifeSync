import { useState, useEffect } from "react";
import { useGroups } from "@context/GroupsContext/GroupProvider";
import { Link } from "react-router-dom";
import Card from "@components/Cards/Card";
import Buttons from "@components/Buttons/Buttons";
import { quotes } from "./quotes";

function HomePage() {
  const { groups, loadingGroups, groupsError, tasksByGroup } = useGroups();

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  if (loadingGroups) return <p>Loading groups...</p>;

  if (groupsError) return <p className="text-red-500">Failed to load groups</p>;

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
            {groups.length === 0 ? (
              <p className="text-center text-gray-400 col-span-2">
                There is no group yet
              </p>
            ) : (
              groups.map((group) => (
                <Card
                  id={group._id}
                  groupName={group.name}
                  groupType={group.groupType}
                  tasks={tasksByGroup[group._id] || []}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* random quote */}
      <section className="ls-section">
        <div className="ls-container text-center py-6">
          <p className="text-lg italic opacity-80">“{quote}”</p>
        </div>
      </section>
    </>
  );
}

export default HomePage;
