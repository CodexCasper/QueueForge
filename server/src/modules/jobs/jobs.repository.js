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

const claimNextJob = async () => {
    return prisma.$transaction(async (tx) => {

        const [job] = await tx.$queryRaw`
        SELECT *
        FROM "Job"
        WHERE status = 'PENDING'
        ORDER BY priority DESC, "createdAt" ASC
        LIMIT 1
        FOR UPDATE SKIP LOCKED
        `;

        if(!job) {
            return null;
        }

        const claimedJob = await tx.job.update({
            where: {
                id: job.id,
            },
            data: {
                status: "PROCESSING",
            },
        });

        return claimedJob;
    })
}

module.exports = {
    create,
    findAll,
    findById,
    updateStatus,
    deleteJob,
    incrementAttempts,
    claimNextJob
}