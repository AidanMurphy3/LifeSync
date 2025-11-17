// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Users, CheckSquare, BarChart2, Bell, Settings, AlertTriangle } from "lucide-react";

// Assuming the group structure is { id, name, tasks: number, completion: number (0-100) }

function HomePage() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // State for handling API errors

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      setError(null); // Clear previous errors
      try {
        const response = await fetch("https://lifesync-ufkl.onrender.com/api/groups");
        
        if (!response.ok) {
          // Throw an error if the HTTP status is not 2xx
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        // Assuming 'data' is an array of groups with 'tasks' and 'completion' fields
        setGroups(data);
      } catch (err) {
        console.error("Error fetching groups:", err);
        setError("Failed to load group data. The API might be offline.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // Calculate aggregated stats
  const totalTasks = groups.reduce((sum, g) => sum + g.tasks, 0);
  const avgCompletion = groups.length
    ? Math.round(
        groups.reduce((sum, g) => sum + g.completion, 0) / groups.length
      )
    : 0;

  // Helper for rendering placeholder/loading state
  const StatPlaceholder = ({ color }) => (
    <div className={`bg-white rounded-xl shadow-md p-6 border-b-4 border-${color}-500 animate-pulse`}>
      <div className={`w-8 h-8 bg-${color}-200 mb-3 rounded-full`}></div>
      <div className="w-1/2 h-4 bg-gray-200 mb-2"></div>
      <div className="w-3/4 h-8 bg-gray-300 rounded"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      
      {/* 💚 NAVIGATION BAR (Fixed Header) 💚 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-extrabold text-green-700">
            LifeSync
          </Link>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-green-600 transition">
              <Bell className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-500 hover:text-green-600 transition">
              <Settings className="w-6 h-6" />
            </button>
            {/* Placeholder for user avatar */}
            <Link to="/profile" className="w-8 h-8 rounded-full bg-green-200 text-green-700 flex items-center justify-center font-medium text-sm">
              JD
            </Link>
          </div>
        </div>
      </header>

      {/* 📊 MAIN DASHBOARD AREA */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        
        {/* DASHBOARD HEADER & QUICK CTAS */}
        <div className="flex justify-between items-start mb-8 flex-col md:flex-row">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
            Welcome Back! 👋
          </h2>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-5 py-2 bg-white text-green-700 font-semibold rounded-full border border-gray-300 shadow-sm hover:bg-gray-100 transition flex items-center justify-center text-sm">
              <Users className="w-4 h-4 mr-2" /> Join Existing Group
            </button>
            <Link
              to="/group/create"
              className="px-5 py-2 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition flex items-center justify-center text-sm"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Create New Group
            </Link>
          </div>
        </div>

        <hr className="mb-8" />
        
        {/* API ERROR MESSAGE */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-3" />
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* STATS CARDS (3-Column Grid) */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {isLoading && !error ? (
            <>
              <StatPlaceholder color="blue" /><StatPlaceholder color="green" /><StatPlaceholder color="purple" />
            </>
          ) : (
            <>
              {/* Active Groups Stat */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-b-4 border-blue-500 hover:shadow-xl transition duration-300">
                <Users className="w-8 h-8 text-blue-500 mb-3" />
                <span className="text-sm font-medium text-gray-500 block">Active Groups</span>
                <span className="text-4xl font-extrabold text-blue-800 mt-1">
                  {groups.length}
                </span>
              </div>

              {/* Total Tasks Stat */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-b-4 border-green-500 hover:shadow-xl transition duration-300">
                <CheckSquare className="w-8 h-8 text-green-500 mb-3" />
                <span className="text-sm font-medium text-gray-500 block">Total Tasks Due</span>
                <span className="text-4xl font-extrabold text-green-800 mt-1">
                  {totalTasks}
                </span>
              </div>

              {/* Avg. Completion Stat */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-b-4 border-purple-500 hover:shadow-xl transition duration-300">
                <BarChart2 className="w-8 h-8 text-purple-500 mb-3" />
                <span className="text-sm font-medium text-gray-500 block">Avg. Completion</span>
                <span className="text-4xl font-extrabold text-purple-800 mt-1">
                  {avgCompletion}%
                </span>
              </div>
            </>
          )}
        </section>

        {/* GROUP LIST & CORE BENEFITS (2-Column Grid) */}
        <section className="grid lg:grid-cols-3 gap-8">
          
          {/* ACTIVE GROUPS LIST CARD (2/3 width) */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border-l-4 border-teal-500">
            <h3 className="text-2xl font-bold text-teal-700 mb-6 flex justify-between items-center">
              Your Active Groups
              <Link to="/groups" className="text-base font-semibold text-teal-600 hover:text-teal-800 transition">
                View All <span aria-hidden="true">→</span>
              </Link>
            </h3>
            
            {isLoading && !error && <p className="text-center py-4 text-gray-500">Loading groups...</p>}

            {!isLoading && !error && groups.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 mb-4">You're not part of any groups yet.</p>
                <Link
                  to="/group/create"
                  className="px-4 py-2 text-sm bg-teal-500 text-white rounded-full shadow hover:bg-teal-600 transition"
                >
                  Start a New Group
                </Link>
              </div>
            )}

            {!isLoading && !error && groups.length > 0 && (
              <ul className="space-y-4">
                {groups.slice(0, 4).map((group) => (
                  <li 
                    key={group.id} 
                    className="p-4 bg-gray-50 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-100 transition border-l-4 border-blue-200"
                  >
                    <div>
                        <span className="font-bold text-lg text-gray-800 block">{group.name}</span>
                        <span className="text-sm text-gray-500">{group.tasks} pending tasks | {group.completion}% complete</span>
                    </div>
                    <Link
                      to={`/group/${group.id}/dashboard`}
                      className="mt-2 sm:mt-0 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-600 px-3 py-1 rounded-full transition"
                    >
                      Go to Dashboard
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* WHY LIFESYNC CARD (1/3 width) */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl p-8 border-l-4 border-gray-400">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              <span role="img" aria-label="lightbulb" className="mr-2">💡</span>
              Core Benefits
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 font-extrabold mr-2 mt-0.5">✓</span>
                **Fairness:** Automated, rotating task assignment.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-extrabold mr-2 mt-0.5">✓</span>
                **Accountability:** Track group habits and individual performance.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-extrabold mr-2 mt-0.5">✓</span>
                **Simplicity:** Clear, intuitive dashboards for everyone.
              </li>
            </ul>
          </div>
        </section>

      </main>
      
      {/* FOOTER PADDING */}
      <div className="py-10"></div>
    </div>
  );
}

export default HomePage;