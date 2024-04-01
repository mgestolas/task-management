const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-management-three-green.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// database
const connectDb = require("./db/connection");
connectDb();

// routes
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
app.use("/auth", userRoutes);
app.use("/task", taskRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
