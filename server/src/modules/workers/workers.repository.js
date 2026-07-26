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
            id: workerId.id,
        },
        data: {
            lastHeartbeat: new Date(),
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

module.exports = {
    createWorker,
    updateHeartbeat,
    markInactive
}