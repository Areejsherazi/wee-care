const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const remedyRoutes = require("./routes/remedyRoutes");
const vaccinationRoutes=require("./routes/vaccinationRoutes");
const milestoneRoutes=require("./routes/milestoneRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const requestRoutes=require('./routes/requestRoutes');
const cors=require('cors');


dotenv.config();
const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to Database
connectDB();

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/remedies", remedyRoutes);
app.use("/api/vaccination",vaccinationRoutes);
app.use("/api/milestone",milestoneRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/dietplan",requestRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
