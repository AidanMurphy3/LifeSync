import { 
  Users, 
  CheckSquare, 
  Calendar, 
  TrendingUp, 
  Award,
  Clock,
  Target,
  ArrowLeft,
  Plus,
  MoreVertical,
  Loader2,
  AlertCircle,
  Lock,
  Globe
} from "lucide-react";
import { useState, useEffect } from "react";

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition duration-300">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold text-gray-600 uppercase">{title}</h3>
      <Icon className={`w-5 h-5 text-${color}-500`} />
    </div>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
    {trend && (
      <p className="text-xs text-green-600 mt-2 flex items-center">
        <TrendingUp className="w-3 h-3 mr-1" />
        {trend}
      </p>
    )}
  </div>
);

// Task Item Component
const TaskItem = ({ task }) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition mb-3">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => setIsCompleted(!isCompleted)}
          className="w-5 h-5 text-blue-600 rounded cursor-pointer"
        />
        <div>
          <p className={`font-medium ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {task.title}
          </p>
          <p className="text-xs text-gray-500">
            Assigned to: {task.assignedTo} • Due: {task.dueDate}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          task.priority === 'High' ? 'bg-red-100 text-red-700' :
          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-green-100 text-green-700'
        }`}>
          {task.priority}
        </span>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Member Card Component
const MemberCard = ({ member }) => {
  const initials = member.name ? member.name.split(' ').map(n => n[0]).join('').toUpperCase() : '?';
  
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
        {initials}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{member.name || 'Unknown User'}</p>
        <p className="text-xs text-gray-500">{member.role || 'Member'}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-gray-800">{member.tasksCompleted || 0}</p>
        <p className="text-xs text-gray-500">tasks done</p>
      </div>
    </div>
  );
};

// Habit Tracker Component
const HabitTracker = ({ habit }) => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-3">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800">{habit.name}</h4>
        <span className="text-sm text-gray-500">{habit.streak} day streak 🔥</span>
      </div>
      <div className="flex gap-2">
        {daysOfWeek.map((day, index) => (
          <div
            key={day}
            className={`flex-1 aspect-square rounded-lg flex items-center justify-center text-xs font-semibold ${
              habit.completed[index] 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

// Loading Spinner
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
      <p className="text-gray-600 text-lg">Loading dashboard...</p>
    </div>
  </div>
);

// Error Display
const ErrorDisplay = ({ message, onRetry }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-red-700 mb-2">Error Loading Dashboard</h3>
      <p className="text-red-600 mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  </div>
);

// Main Dashboard Component
export default function Dashboard() {
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract group ID from URL (for demo, using first group)
  const groupId = "6915705adfeadfbc8f31ae5c"; // Replace with actual route param

  const fetchGroupData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://lifesync-ufkl.onrender.com/api/groups/${groupId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch group: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Transform API data to match component structure
      setGroupData({
        _id: data._id,
        name: data.name,
        description: data.description || 'No description provided',
        groupType: data.groupType,
        privacySetting: data.privacySetting,
        owner: data.owner,
        members: data.members || [],
        stats: {
          totalTasks: 0, // Will be populated from tasks API
          completedTasks: 0,
          activeMembers: (data.members || []).length,
          upcomingDeadlines: 0
        },
        tasks: [], // Placeholder for tasks
        habits: [] // Placeholder for habits
      });
      
    } catch (err) {
      console.error('Error fetching group data:', err);
      setError(err.message || 'Unable to load group dashboard. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} onRetry={fetchGroupData} />;
  if (!groupData) return <ErrorDisplay message="Group not found" onRetry={fetchGroupData} />;

  // Mock data for tasks and habits (replace with actual API calls)
  const mockTasks = [
    { id: 1, title: "Complete morning routine", assignedTo: "Member 1", dueDate: "Today", priority: "High", completed: false },
    { id: 2, title: "Log daily progress", assignedTo: "Member 2", dueDate: "Tomorrow", priority: "Medium", completed: false },
  ];

  const mockHabits = [
    { id: 1, name: "Morning Meditation", streak: 5, completed: [true, true, false, true, true, false, false] },
    { id: 2, name: "Exercise", streak: 3, completed: [true, true, true, false, false, false, false] },
  ];

  // Mock member details (you'll need to fetch actual user data)
  const mockMembers = groupData.members.slice(0, 4).map((memberId, index) => ({
    id: memberId,
    name: `Member ${index + 1}`,
    role: memberId === groupData.owner ? 'Admin' : 'Member',
    tasksCompleted: Math.floor(Math.random() * 20)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <a href="/groups" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 font-semibold">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Groups
          </a>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-gray-900">{groupData.name}</h1>
                <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {groupData.privacySetting === 'Private' ? (
                    <><Lock className="w-3 h-3" /> Private</>
                  ) : (
                    <><Globe className="w-3 h-3" /> Public</>
                  )}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{groupData.description}</p>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                {groupData.groupType}
              </span>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition">
              Group Settings
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Tasks" 
            value={mockTasks.length} 
            icon={CheckSquare} 
            color="blue"
          />
          <StatsCard 
            title="Completed" 
            value={mockTasks.filter(t => t.completed).length} 
            icon={Award} 
            color="green"
            trend="+12% this week"
          />
          <StatsCard 
            title="Active Members" 
            value={groupData.stats.activeMembers} 
            icon={Users} 
            color="purple"
          />
          <StatsCard 
            title="Upcoming" 
            value={mockTasks.filter(t => !t.completed).length} 
            icon={Clock} 
            color="orange"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Tasks & Habits */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Tasks Section */}
            <section className="bg-gray-50 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <CheckSquare className="w-6 h-6 mr-2 text-blue-500" />
                  Active Tasks
                </h2>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition flex items-center">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Task
                </button>
              </div>
              
              {mockTasks.length > 0 ? (
                <div className="space-y-3">
                  {mockTasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CheckSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No tasks yet. Create your first task!</p>
                </div>
              )}
              
              <button className="w-full mt-4 py-3 text-blue-600 hover:text-blue-800 font-semibold hover:bg-blue-50 rounded-lg transition">
                View All Tasks →
              </button>
            </section>

            {/* Habits Section */}
            <section className="bg-gray-50 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-green-500" />
                  Group Habits
                </h2>
                <button className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full hover:bg-green-700 transition flex items-center">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Habit
                </button>
              </div>
              
              {mockHabits.length > 0 ? (
                <div>
                  {mockHabits.map(habit => (
                    <HabitTracker key={habit.id} habit={habit} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No habits yet. Create your first habit!</p>
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Members & Activity */}
          <div className="space-y-6">
            
            {/* Members Section */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-500" />
                  Members ({mockMembers.length})
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-semibold">
                  + Add
                </button>
              </div>
              
              <div className="space-y-3">
                {mockMembers.map(member => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </section>

            {/* Quick Stats */}
            <section className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
              <h3 className="text-lg font-bold mb-4">This Week's Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Completion Rate</span>
                  <span className="font-bold text-xl">
                    {mockTasks.length > 0 
                      ? Math.round((mockTasks.filter(t => t.completed).length / mockTasks.length) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full" 
                    style={{ 
                      width: `${mockTasks.length > 0 
                        ? (mockTasks.filter(t => t.completed).length / mockTasks.length) * 100
                        : 0}%` 
                    }}>
                  </div>
                </div>
                <div className="flex justify-between text-sm opacity-90 mt-4">
                  <span>{mockTasks.filter(t => t.completed).length} completed</span>
                  <span>{mockTasks.filter(t => !t.completed).length} remaining</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}