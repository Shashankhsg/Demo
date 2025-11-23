import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: ""
  });

  // Fetch events on load
  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date) {
      alert("Title and Date are required");
      return;
    }

    try {
      await api.post("/events", form);
      setForm({ title: "", description: "", date: "", venue: "" });
      fetchEvents(); // reload list
    } catch (err) {
      console.error("Error creating event", err);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      fetchEvents(); // reload list
    } catch (err) {
      console.error("Error deleting event", err);
      alert("Failed to delete event");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
      <h1>Event Manager (MERN)</h1>

      {/* Event Form */}
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Title: </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Description: </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Date: </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Venue: </label>
          <input
            name="venue"
            value={form.venue}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <button type="submit">Create Event</button>
      </form>

      {/* Event List */}
      <h2>All Events</h2>
      {events.length === 0 && <p>No events yet. Add one above!</p>}

      <ul>
  {events.map((event) => (
    <li key={event._id} style={{ marginBottom: "1rem" }}>
      <strong>{event.title}</strong> <br />
      {event.description && <span>{event.description} <br /></span>}
      <small>
        Date: {new Date(event.date).toLocaleDateString()} | Venue:{" "}
        {event.venue || "N/A"}
      </small>
      <br />
      <button onClick={() => handleDelete(event._id)}>
        Delete
      </button>
    </li>
  ))}
</ul>

      
    </div>
  );
}

export default App;
