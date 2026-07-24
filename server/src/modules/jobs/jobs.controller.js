const { success } = require("zod");
const asyncHandler = require("../../utils/asyncHandler");
const jobsService = require("./jobs.service");

const createJob = asyncHandler(async(req , res , next) => {
        const job = await jobsService.createJob(req.body);

        res.status(201).json({
            success: true,
            data: job,
        })

});

const getAllJobs = asyncHandler(async(req,res) => {

    const jobs = await jobsService.getAllJobs();

    res.json({
        success: true,
        count: jobs.length,
        data: jobs,
    });

});

const getJobById = asyncHandler(async(req , res) => {

    const job = await jobsService.getJobById(req.params.id);

    res.json({
        success:true,
        data: job
    });

});

const updateJobStatus = asyncHandler(async(req , res) => {

    const job = await jobsService.updateJobStatus(
        req.params.id,
        req.body
    );

    res.json({
        success:true,
        data: job
    });

})

const deleteJob = asyncHandler(async(req, res) => {

    const job = await jobsService.deleteJob(req.params.id);

    res.json({
        success: true,
        message: "Job Deleted Successfully",
        data: job
    });

});

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJobStatus,
    deleteJob
}