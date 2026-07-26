const prisma  = require("../../config/prisma");

const createWorker = async (workerName) => {

    return prisma.worker.create({
        data: {
            workerName,
        },
    });
};

const updateHeartbeat = async (workerId) => {

    return prisma.worker.update({
        where: {
            id: workerId,
        },
        data: {
            lastHeartBeat: new Date(),
        },
    });
};

const markInactive = async (workerId) => {

    return prisma.worker.update({
        where: {
            id: workerId.id,
        },
        data: {
            status: "INACTIVE"
        },
    });
};

const findAllWorkers = async () => {

    return prisma.worker.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

const findAllWorkerById = async (id) => {

    return prisma.worker.findUnique({
        where: {
            id,
        },
    });
};


module.exports = {
    createWorker,
    updateHeartbeat,
    markInactive,
    findAllWorkerById,
    findAllWorkers
}