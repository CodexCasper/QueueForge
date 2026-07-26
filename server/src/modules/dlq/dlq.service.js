const dlqRepository = require("./dlq.repository");

const getAllFailedJobs = async () => {

    return await dlqRepository.findAll();

}

const deleteFailedJob = async (id) => {
    
    return await dlqRepository.deleteDLQJob();

}

const replayJob = async (id) => {

    return await dlqRepository.replayJob(id);

}

module.exports = {
    getAllFailedJobs,
    deleteFailedJob,
    replayJob
}