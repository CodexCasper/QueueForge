const workerRepository = require("./workers.repository");

const getAllWorkers = async () => {

    return await workerRepository.findAllWorkers();

}

const getWorkerById = async (id) => {

    return workerRepository.findAllWorkerById(id);
}


module.exports = {
    getAllWorkers,
    getWorkerById,
};