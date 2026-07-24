const prisma = require("../../config/prisma");

const create = async (jobData) => {
    return await prisma.job.create({
        data: jobData,
    });
}

const findAll = async () => {
    return prisma.job.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

const findById = async (id) => {
    return prisma.job.findUnique({
        where: {
            id,
        },
    });
};

const updateStatus = async(id , status) => {

    return prisma.job.update({
        where: {
            id,
        },
        data: {
            status,
        },
    });

};

const deleteJob = async (id) => {
    return prisma.job.delete({
        where: {
            id,
        },
    });
};

const findNextPendingJob = async () =>{

    return prisma.job.findFirst({
        where: {
            status: "PENDING",
        },
        orderBy: [
             {
            priority: "desc",
        },
        {
            createdAt: "asc",
        },
        ],
    });

};

const incrementAttempts = async (jobId) => {
    return prisma.job.update({
        where: {
            id: jobId
        },
        data: {
            attempts: {
                increment: 1
            },
        },
    });
};


module.exports = {
    create,
    findAll,
    findById,
    updateStatus,
    deleteJob,
    findNextPendingJob,
    incrementAttempts
}