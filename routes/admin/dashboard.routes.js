const express = require("express");
const {
  getAdminDashboardStats,
} = require("../../controllers/admin/dashboard.controller");
const router = express.Router();

// GET /admin/dashboard-stats
router.get("/dashboard-stats", getAdminDashboardStats);

module.exports = router;
