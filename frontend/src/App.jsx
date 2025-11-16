// src/App.jsx
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/homePage.jsx";
import Nav from "@components/Nav/nav.jsx";
import Footer from "@components/Footer/Footer.jsx";

import "@styles/main.css";

// high-level pages
import GroupManagementPage from "./pages/GroupManagementPage.jsx";
import TaskHabitPage from "./pages/TaskHabitPage.jsx";

// group management story pages
import CreateGroup from "./pages/GroupManagement/CreateGroup.jsx";
import AddMembers from "./pages/GroupManagement/AddMembers.jsx";
import EditGroup from "./pages/GroupManagement/EditGroup.jsx";
import DeleteGroup from "./pages/GroupManagement/DeleteGroup.jsx";
import AssignRoles from "./pages/GroupManagement/AssignRoles.jsx";
import LeaveGroup from "./pages/GroupManagement/LeaveGroup.jsx";

// task/habit story pages
import CreateTaskHabit from "./pages/TaskHabit/CreateTaskHabit.jsx";
import AssignTask from "./pages/TaskHabit/AssignTask.jsx";
import EditTaskHabit from "./pages/TaskHabit/EditTaskHabit.jsx";
import ApproveTaskHabit from "./pages/TaskHabit/ApproveTaskHabit.jsx";
import MemberAddTaskHabit from "./pages/TaskHabit/MemberAddTaskHabit.jsx";
import ViewMemberTasks from "./pages/TaskHabit/ViewMemberTasks.jsx";
import ViewerTaskStatus from "./pages/TaskHabit/ViewerTaskStatus.jsx";

function App() {
  return (
    <div className="ls-app">
      <Nav />

      <main>
        <Routes>
          {/* home */}
          <Route path="/" element={<HomePage />} />

          {/* high-level grouped pages */}
          <Route path="/group-management" element={<GroupManagementPage />} />
          <Route path="/task-habits" element={<TaskHabitPage />} />

          {/* group management stories */}
          <Route path="/group/create" element={<CreateGroup />} />
          <Route path="/group/add-members" element={<AddMembers />} />
          <Route path="/group/edit" element={<EditGroup />} />
          <Route path="/group/delete" element={<DeleteGroup />} />
          <Route path="/group/assign-roles" element={<AssignRoles />} />
          <Route path="/group/leave" element={<LeaveGroup />} />

          {/* task & habit stories */}
          <Route path="/task/create" element={<CreateTaskHabit />} />
          <Route path="/task/assign" element={<AssignTask />} />
          <Route path="/task/edit" element={<EditTaskHabit />} />
          <Route path="/task/approve" element={<ApproveTaskHabit />} />
          <Route path="/task/member-add" element={<MemberAddTaskHabit />} />
          <Route path="/task/member-view" element={<ViewMemberTasks />} />
          <Route path="/task/viewer" element={<ViewerTaskStatus />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
