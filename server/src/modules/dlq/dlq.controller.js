const dlqService = require("./dlq.service");
const asyncHandler = require("../../utils/asyncHandler");

const getAllFailedJobs = asyncHandler(async (req, res) => {

    const jobs = await dlqService.getAllFailedJobs();

    res.status(200).json({
        success: true,
        data: jobs,
    });
});


const deleteFailedJob = asyncHandler(async (req, res) => {

    const { id } = req.params;

    await dlqService.deleteFailedJob(id);

    res.status(200).json({
        success: true,
        message: "Dead Letter Job deleted Successfully",
    });
})

module.exports = {
    deleteFailedJob,
    getAllFailedJobs
}