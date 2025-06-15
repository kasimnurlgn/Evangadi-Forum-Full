const express = require("express");
const cors = require("cors");
require("dotenv").config();
// Routes 
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");
//Teh connection 
const dbConnection = require("./database/dbConfig");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

async function start() {
  try {
    const [result] = await dbConnection.query("SELECT 'test'");
    console.log("Database test successful:", result);
    const PORT = process.env.PORT || 3306;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
}

start();
