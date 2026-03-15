require("dotenv").config({
   path: __dirname + "/.env"
});

const express = require("express");
const cors = require("cors");

const app = express();
const userRoutes = require("./routes/users");
app.use(cors());
app.use(express.json());
/* =========================
   ROUTE IMPORTS
========================= */
const authRoutes = require("./routes/auth");
const documentRoutes = require("./routes/documents");
const passwordRoutes = require("./routes/password");

const departmentsRoutes = require("./routes/departments");
const categoriesRoutes = require("./routes/categories");

const adminUsersRoutes = require("./routes/adminUsers");
const auditRoutes = require("./routes/auditLogs");
const sequenceRoutes = require("./routes/auditSequences");
const adminRoutes = require("./routes/admin");
const emailDomainsRoutes = require("./routes/emailDomains");

/* =========================
   PUBLIC ROUTES
========================= */
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/users", userRoutes);


/* =========================
   USER ROUTES
========================= */

app.use("/api/documents", documentRoutes);


/* =========================
   ADMIN / REFERENCE DATA
========================= */

app.use("/api/admin/departments", departmentsRoutes);
app.use("/api/admin/categories", categoriesRoutes);


/* =========================
   ADMIN OPERATIONS
========================= */

app.use("/api/adminUsers", adminUsersRoutes);
app.use("/api/admin/audit", auditRoutes);
app.use("/api/admin/sequences", sequenceRoutes);
app.use("/api/admin/email-domains", emailDomainsRoutes);


/* =========================
   SYSTEM HEALTH CHECK
========================= */

app.get("/api/system/health", (req, res) => {
   res.json({
      status: "OK",
      timestamp: new Date()
   });
});


/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 7050;
app.use((req, res) => {
   res.status(404).json({
      error: "API route not found"
   });
});
app.listen(PORT, () => {

   console.log("SMTP_HOST:", process.env.SMTP_HOST);
   console.log(`🚀 Server running on port ${PORT}`);

});