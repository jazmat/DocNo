/**
 * File: backend/src/app.js
 */

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
   res.json({ status: "OK" });
});

/* ROUTES */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/documents", require("./routes/documents"));
app.use("/api/users", require("./routes/users"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/lookups", require("./routes/lookups"));
app.use((req, res) => {
   res.status(404).json({ error: "Route not found" });
});

module.exports = app;