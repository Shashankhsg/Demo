import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();
const app = express();

// connect to MongoDB
connectDB();

// middlewares
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// routes
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
