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

module.exports = {
    create,
    findAll,
    findById,
    updateStatus,
    deleteJob
}