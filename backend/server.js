require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workouts.route");
const cors = require("cors");
// express app
const app = express();

// middleware
app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// connect database
mongoose
  .connect(process.env.DATA_BASE_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        " connnected with Db and  listening on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => console.log(err));
