const metricsService = require("./metrics.service");
const asyncHandler = require("../../utils/asyncHandler");

const getMetrics = asyncHandler(async(req, res) => {

    const metrics = await metricsService.getMetrics();

    res.status(200).json({
        success: true,
        data: metrics,
    });

})

module.exports = {
    getMetrics,
    
}