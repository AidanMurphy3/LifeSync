// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Mock data structure for the useEffect call
// interface Group {
//   id: number;
//   name: string;
//   tasks: number; // Total tasks
//   completion: number; // Average completion rate (0-100)
// }

function LoginPage() {
  // Initialize with a default structure to prevent errors during initial render
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // ⚠️ Replace with your actual API fetch:
    // fetch("https://lifesync-ufkl.onrender.com/api/groups")
    //   .then((res) => res.json())
    //   .then((data) => setGroups(data))
    //   .catch((err) => console.error(err));

    // --- Mock Data for Styling Demonstration ---
    const mockData = [
      { id: 1, name: "Roomies", tasks: 5, completion: 85 },
      { id: 2, name: "Project-A", tasks: 12, completion: 60 },
      { id: 3, name: "Family Chores", tasks: 3, completion: 100 },
    ];
    // Simulate API delay
    const timer = setTimeout(() => {
      setGroups(mockData);
    }, 500);
    return () => clearTimeout(timer);
    // ------------------------------------------
  }, []);

  // Calculate aggregated stats
  const totalTasks = groups.reduce((sum, g) => sum + g.tasks, 0);
  const avgCompletion = groups.length
    ? Math.round(
        groups.reduce((sum, g) => sum + g.completion, 0) / groups.length
      )
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <section className="bg-teal-50 text-gray-800 py-16 lg:py-24 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-teal-800 mb-4 tracking-tight">
            Welcome to LifeSync
          </h1>
          <p className="text-xl lg:text-2xl text-teal-700 font-light mb-8 max-w-3xl mx-auto">
            Coordinate <span className="font-bold"> shared habits, tasks, and goals </span> with your group, effortlessly.
          </p>

          {/* HERO CTA BUTTONS */}
          <div className="flex justify-center gap-4 flex-wrap mb-12">
            <Link
              to="/login"
              className="px-8 py-3 bg-teal-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-teal-700 transition transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-8 py-3 bg-white text-teal-600 font-bold text-lg border-2 border-teal-600 rounded-full shadow-lg hover:bg-teal-50 transition transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Syncing →
            </Link>
          </div>

          {/* TODAY AT A GLANCE CARD (STATISTICS) */}
          <div className="bg-white text-gray-800 rounded-3xl shadow-2xl p-8 max-w-lg mx-auto border-t-4 border-teal-500">
            <h2 className="text-2xl font-bold mb-6 text-teal-800 flex items-center justify-center">
              Today's Sync Status
            </h2>

            <div className="grid grid-cols-3 gap-4 border-t pt-4">
              {/* Active Groups */}
              <div className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-teal-600">
                  {groups.length}
                </span>
                <span className="font-medium text-sm text-gray-500 mt-1">
                  Active Groups
                </span>
              </div>

              {/* Total Tasks */}
              <div className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-blue-600">
                  {totalTasks}
                </span>
                <span className="font-medium text-sm text-gray-500 mt-1">
                  Total Tasks
                </span>
              </div>

              {/* Avg. Completion */}
              <div className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-purple-600">
                  {avgCompletion}%
                </span>
                <span className="font-medium text-sm text-gray-500 mt-1">
                  Avg. Completion
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-6 pt-4 border-t">
              Real-time snapshot based on connected group data.
            </p>
          </div>
        </div>
      </section>

      {/* --- */}

      {/* 🚀 MAIN FEATURES SECTION */}
      <main className="flex-1 px-4 lg:px-8 py-16 grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {/* WHY LIFESYNC CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-blue-500">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center">
            Why LifeSync?
          </h2>
          <ul className="space-y-4 text-lg text-gray-700 list-inside">
            <li className="flex items-start">
              <span className="text-blue-500 font-extrabold mr-2 mt-1">✓ Fair Task Assignment</span>
               Never argue over chores again. Distribute tasks evenly.
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 font-extrabold mr-2 mt-1">✓ Habit Accountability</span>
              Track group habits like gym attendance or reading goals.
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 font-extrabold mr-2 mt-1">✓ Clear Progress</span>
              Visualize your group's achievements with simple, dynamic dashboards.
            </li>
          </ul>
        </div>

        {/* USE CASES CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-purple-500">
          <h2 className="text-3xl font-bold text-purple-700 mb-4 flex items-center">
            <span className="mr-3">🎯</span>
            Who Uses LifeSync?
          </h2>
          <ul className="space-y-4 text-lg text-gray-700 list-inside">
            <li className="flex items-start">
              <span className="text-purple-500 font-extrabold mr-2 mt-1">★</span>
              **Roommates:** Manage cleaning schedules, bills, and grocery lists.
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 font-extrabold mr-2 mt-1">★</span>
              **Families:** Coordinate family chores, appointments, and shared projects.
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 font-extrabold mr-2 mt-1">★</span>
              **Study/Work Teams:** Keep track of shared project milestones and deadlines.
            </li>
          </ul>
        </div>
      </main>

      {/* --- */}

      {/* FOOTER */}
      <footer className="bg-gray-100 py-6 text-center text-gray-500 text-sm border-t">
        <p>
          LifeSync &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default LoginPage;

