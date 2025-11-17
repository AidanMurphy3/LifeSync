// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

// layout components
import Nav from "@components/Nav/nav.jsx";
import Footer from "@components/Footer/Footer.jsx";

// high-level pages
import LoginPage from "./pages/Login/loginPage.jsx";
import HomePage from "./pages/HomePage/homePage.jsx";
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
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">

      {/* NAVBAR */}
      <Nav />
      
      {/* MAIN CONTENT */}
      <main className="flex-1 px-4 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-sm">

          <Routes>
            {/* home */}
            <Route path="/" element={<LoginPage/>} />
            <Route path="/home" element={<HomePage/>} />

            {/* group management */}
            <Route path="/group-management" element={<GroupManagementPage />} />
            <Route path="/group/create" element={<CreateGroup />} />
            <Route path="/group/add-members" element={<AddMembers />} />
            <Route path="/group/edit" element={<EditGroup />} />
            <Route path="/group/delete" element={<DeleteGroup />} />
            <Route path="/group/assign-roles" element={<AssignRoles />} />
            <Route path="/group/leave" element={<LeaveGroup />} />

            {/* tasks & habits */}
            <Route path="/task-habits" element={<TaskHabitPage />} />
            <Route path="/task/create" element={<CreateTaskHabit />} />
            <Route path="/task/assign" element={<AssignTask />} />
            <Route path="/task/edit" element={<EditTaskHabit />} />
            <Route path="/task/approve" element={<ApproveTaskHabit />} />
            <Route path="/task/member-add" element={<MemberAddTaskHabit />} />
            <Route path="/task/member-view" element={<ViewMemberTasks />} />
            <Route path="/task/viewer" element={<ViewerTaskStatus />} />
          </Routes>

        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;

