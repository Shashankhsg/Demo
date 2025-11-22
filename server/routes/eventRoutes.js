// routes/eventRoutes.js
import express from "express";
import { Event } from "../models/Event.js";

const router = express.Router();

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err.message);
    res.status(500).json({ message: "Error fetching events" });
  }
});

// POST create event
router.post("/", async (req, res) => {
  try {
    console.log("Incoming event body:", req.body);
    const { title, description, date, venue } = req.body;

    if (!title || !date) {
      console.log("Validation failed: missing title or date");
      return res.status(400).json({ message: "Title and date are required" });
    }

    // Try to parse date for logging
    let parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      console.log("Invalid date format received:", date);
    } else {
      console.log("Parsed date:", parsedDate);
    }

    // Attempt to create event
    try {
      const event = await Event.create({ title, description, date, venue });
      console.log("Event created successfully:", event);
      res.status(201).json(event);
    } catch (dbErr) {
      console.error("Database error while creating event:", dbErr);
      res.status(500).json({ message: "Database error", error: dbErr.message });
    }
  } catch (err) {
    console.error("Error in POST /api/events handler:", err);
    res.status(500).json({ message: "Error creating event", error: err.message });
  }
});

export default router;
