// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";

import "./App.css";
import "@styles/main.css";

// layout components
import Nav from "@components/Nav/nav.jsx";
import Footer from "@components/Footer/Footer.jsx";
import FriendsColumn from "@components/Friends/Friend.jsx";
import Sidebar from "@components/Sidebar/Sidebar.jsx";

// high-level pages
import HomePage from "@pages/HomePage/homePage.jsx";
import GroupManagementPage from "@pages/Groups/GroupManagementPage.jsx";
import TaskHabitPage from "@pages/TaskHabitPage.jsx";
import Authen from "@pages/LoginSignUp/Login.jsx";

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
import { sidebarContext } from "./context/Sidebar/SidebarProvider.jsx";

function App() {
  const location = useLocation();
  const { user } = useContext(sidebarContext);
  const isLoggedIn = !!user;
  return (
    <>
      <Toaster position="top-right" />
      {location.pathname !== "/Authentication" && !isLoggedIn && <Sidebar />}
      <div className="min-h-screen flex flex-col">
        <Nav />

        <div className="flex flex-1">
          <main className="flex-1" style={{ paddingBottom: "0px" }}>
            <Routes>
              {/* home */}
              <Route path="/" element={<HomePage />} />

              <Route path="/Authentication" element={<Authen />} />

              {/* group management */}
              <Route
                path="/group-management/:id"
                element={<GroupManagementPage />}
              />
              <Route path="/group/create" element={<CreateGroup />} />
              <Route path="/group/add-members" element={<AddMembers />} />
              <Route path="/group/edit/:id" element={<EditGroup />} />
              <Route path="/group/delete" element={<DeleteGroup />} />
              <Route path="/group/assign-roles" element={<AssignRoles />} />
              <Route path="/group/leave" element={<LeaveGroup />} />

              {/* tasks & habits */}
              <Route
                path="/task/create/:groupId"
                element={<CreateTaskHabit />}
              />
              <Route path="/task/assign" element={<AssignTask />} />
              <Route path="/task/edit/:id" element={<EditTaskHabit />} />
              <Route path="/task/member-add" element={<MemberAddTaskHabit />} />
              <Route path="/task/member-view" element={<ViewMemberTasks />} />
              <Route path="/task/viewer" element={<ViewerTaskStatus />} />
            </Routes>
          </main>

          {location.pathname !== "/Authentication" && <FriendsColumn />}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
