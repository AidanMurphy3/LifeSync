const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database.js");
const userRoutes = require("./routes/userRoutes.js");
const groupRoutes = require("./routes/groupRoutes.js");
const tasksRoutes = require("./routes/taskRoutes.js");

dotenv.config();

connectDB();

const app = express();

// ------------------------------------
// FIX: ENABLE CORS FOR FRONTEND
// ------------------------------------
app.use(
  cors({
    origin: "*", // allow all sources (for testing)
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

const PORT = process.env.PORT || 3000;

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/tasks", tasksRoutes);

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
