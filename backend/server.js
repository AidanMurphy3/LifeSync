const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database.js");
const userRoutes = require("./routes/userRoutes.js");
const groupRoutes = require("./routes/groupRoutes.js");
const groupMembershipRoutes = require("./routes/groupMembershipRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://synclife.netlify.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/groupMemberships", groupMembershipRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
