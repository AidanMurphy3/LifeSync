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

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/groupMemberships", groupMembershipRoutes);
app.use("/api/tasks", taskRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
