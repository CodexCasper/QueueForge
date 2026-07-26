const dlqRepository = requirte("./dlq.repository");

const getAllFailedJobs = async () => {

    return await dlqRepository.findAll();

}

const deleteFailedJob = async (id) => {
    
    return await dlqRepository.deleteDLQJob();

}

module.exports = {
    getAllFailedJobs,
    deleteFailedJob
}