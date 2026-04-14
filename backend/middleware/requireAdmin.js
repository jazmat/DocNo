module.exports = (req, res, next) => {
  try {
    // Ensure user exists (set by auth middleware)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check admin flag
    if (req.user.is_admin !== 1) {
      return res.status(403).json({ message: "Admin access required" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};