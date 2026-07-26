const dlqRepository = require("./dlq.repository");

const getAllFailedJobs = async () => {

    return await dlqRepository.findAll();

}

const deleteFailedJob = async (id) => {
    
    return await dlqRepository.deleteDLQJob(id);

}

const replayJob = async (id) => {

    const deadLetterJob = await dlqRepository.findById(id);

    if (!deadLetterJob) {
        throw new Error("Dead Letter Job Not Found");
    }

    return dlqRepository.replayJob(deadLetterJob);
};

module.exports = {
    getAllFailedJobs,
    deleteFailedJob,
    replayJob
}