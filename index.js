const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const remedyRoutes = require("./routes/remedyRoutes");
const vaccinationRoutes=require("./routes/vaccinationRoutes");
const milestoneRoutes=require("./routes/milestoneRoutes");


dotenv.config();
const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to Database
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/remedies", remedyRoutes);
app.use("/api/vaccination",vaccinationRoutes);
app.use("/api/milestone",milestoneRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
