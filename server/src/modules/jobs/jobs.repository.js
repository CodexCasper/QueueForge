const prisma = require("../../config/prisma");


/**
 * 
 * @param {object} jobData - validated job fields 
 * @returns {Promise<Object>} the created job
 */
const create = async (jobData) => {
    return await prisma.job.create({
        data: jobData,
    });
}


/**
 * Retreive all the jobs , newest first
 * @returns {Promise<Object[]>} All jobs
 */
const findAll = async () => {
    return prisma.job.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};


/**
 * find a job by unique id
 * @param {String} id - job id 
 * @returns {Promise<Object|Null>} the job or null if found
 */
const findById = async (id) => {
    return prisma.job.findUnique({
        where: {
            id,
        },
    });
};


/**
 * Updates a job's lifecycle status.
 *
 * @param {string} id - Job ID.
 * @param {"PENDING"|"PROCESSING"|"COMPLETED"|"FAILED"} status
 * @returns {Promise<Object>} The updated job.
 */
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


/**
 * Increments the attempt count after a failed execution.
 *
 * Note: The worker currently uses this method after failure.
 * We will align this with claim-time attempt counting when
 * updating the worker lifecycle.
 *
 * @param {string} jobId - Job ID.
 * @returns {Promise<Object>} The updated job.
 */
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


/**
 * Atomically claims the highest-priority pending job.
 *
 * PostgreSQL locks the selected row for the duration of the
 * transaction. SKIP LOCKED allows concurrent workers to skip
 * jobs already claimed by another transaction.
 *
 * @returns {Promise<Object|null>} The claimed job, or null when no pending job is available.
 */
const claimNextJob = async () => {
    return prisma.$transaction(async (tx) => {

        const jobs = await tx.$queryRaw`
        SELECT *
        FROM "Job"
        WHERE status = 'PENDING'
        ORDER BY priority DESC, "createdAt" ASC
        LIMIT 1
        FOR UPDATE SKIP LOCKED
        `;

        const job = jobs[0];

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
    incrementAttempts,
    claimNextJob
}