

require("dotenv").config();
const nodemailer = require("nodemailer");
// DEBUG (PUT HERE  NOT in db.js)
const path = require("path");
//console.log("ENV CHECK:");
//console.log("DB_USER:", process.env.DB_USER);
//console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
//console.log("DB_NAME:", process.env.DB_NAME);
//console.log("RUNNING FROM:", __dirname);
//console.log("ENV PATH:", require("path").resolve(".env.production"));

const express = require("express");
const cors = require("cors");

const auth = require("./middleware/authMiddleware");
const requireAdmin = require("./middleware/requireAdmin");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
/* =========================
   MIDDLEWARE
========================= */
app.use(cors({
  origin: (process.env.ALLOWED_ORIGINS || "").split(",").filter(Boolean),
  credentials: true,
}));

app.use(express.json());

/* =========================
   ROUTE IMPORTS
========================= */
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const documentRoutes = require("./routes/documents");
const passwordRoutes = require("./routes/password");
const departmentsRoutes = require("./routes/departments");
const categoriesRoutes = require("./routes/categories");
const adminUsersRoutes = require("./routes/adminUsers");
const auditRoutes = require("./routes/auditLogs");
const sequenceRoutes = require("./routes/auditSequences");
const emailDomainsRoutes = require("./routes/emailDomains");

/* =========================
   API ROUTES
========================= */
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/users", userRoutes);
app.use("/api/documents", documentRoutes);

app.use("/api/admin/departments", departmentsRoutes);
app.use("/api/admin/categories", categoriesRoutes);
app.use("/api/adminUsers", adminUsersRoutes);
//console.log("🔥 SERVER USING auditRoutes");
app.use("/api/admin/audit", auditRoutes);
app.use("/api/admin/sequences", sequenceRoutes);
app.use("/api/admin/email-domains", emailDomainsRoutes);


/* =========================
   SYSTEM HEALTH
========================= */
app.get("/api/system/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date()
  });
});

/* =========================
   404 HANDLER (API ONLY)
========================= */
app.use("/api", (req, res) => {
  res.status(404).json({
    error: "API route not found"
  });
});

/* =========================
   SERVE FRONTEND (PRODUCTION ONLY)
========================= */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
  });
}
/* =========================
   REACT FALLBACK (LAST ONLY)
========================= */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

/* =========================
   START SERVER
========================= */
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.use((err, req, res, next) => {
    console.error("🔥 GLOBAL ERROR:", err);
    res.status(500).json({
      message: "Internal server error",
    });
  });
  app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port " + PORT);
  });
}

module.exports = app;