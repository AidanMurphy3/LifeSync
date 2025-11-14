
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database.js");
const userRoutes = require("./routes/userRoutes.js");
const groupRoutes = require("./routes/groupRoutes.js");
const tasksRoutes = require("./routes/taskRoutes.js");

dotenv.config();

connectDB();

const app = express()
app.use(express.json()); 

const PORT = process.env.PORT || 3000;

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/tasks', tasksRoutes);

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
 
