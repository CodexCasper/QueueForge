const jobsRepository = require("./jobs.repository");
const { createJobSchema , updateStatusSchema } = require("./jobs.validation")

const createJob = async (jobData) => {
    
    const validatedData = createJobSchema.parse(jobData);

    return await jobsRepository.create(jobData);
};

const getAllJobs = async () => {

    return jobsRepository.findAll();
}

const getJobById = async (id) => {

    const job = await jobsRepository.findById(id);

    if(!job){
        throw new Error("job not found");
        
    }

    return job;
}

const updateJobStatus = async (id,body) => {

    const { status } = updateStatusSchema.parse(body);

    const job = await jobsRepository.findById(id);

    if(!job) {
        throw new error("Job Not Found");
    }

    return jobsRepository.updateStatus(id , status);
}

module.exports ={
    createJob,
    getAllJobs,
    getJobById,
    updateJobStatus,
}