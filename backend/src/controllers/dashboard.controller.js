const dashboardService = require("../services/dashboard.service");

const getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;
        const dashboardDate = await dashboardService.getDashboardData(userId);

        return res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully.",
            ...getDashboardData
        });
    }

    catch (error) {
        console.error("Dashboard Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard data."
        });
    }
};

module.exports = { getDashboard };