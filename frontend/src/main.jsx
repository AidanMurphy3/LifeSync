// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "@context/Sidebar/SidebarProvider";
import { GroupProvider } from "@context/GroupsContext/GroupProvider";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SidebarProvider>
      <GroupProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GroupProvider>
    </SidebarProvider>
  </StrictMode>
);
