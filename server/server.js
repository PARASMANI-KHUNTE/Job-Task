const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
const dotenv = require('dotenv')
const adminRoutes = require("./routes/admin");
const formDataRoutes = require("./routes/formData");
// const googleCloud = require('./routes/googleCloud')
dotenv.config()
const app = express();
const PORT = process.env.port;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin : "https://job-task-7dd6.onrender.com"
}))

// MongoDB Connection
mongoose
  .connect(`${process.env.mongoUri}/collector`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/form", formDataRoutes);
app.get('/test', (req, res) => {
  res.status(200).send('Server is up.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
