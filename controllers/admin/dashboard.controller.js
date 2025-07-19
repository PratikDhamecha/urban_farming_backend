const { getDashboardStats } = require("../../services/admin/dashboard.service");

const getAdminDashboardStats = async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.json(stats);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to fetch dashboard stats",
        details: error.message,
      });
  }
};

module.exports = { getAdminDashboardStats };
