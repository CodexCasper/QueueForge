
const prisma = require("../../config/prisma");

/**
 * Moves an exhausted job into the Dead Letter Queue.
 *
 * Both operations run inside one database transaction:
 * 1. Create the DLQ record.
 * 2. Delete the original job.
 *
 * If either operation fails, the transaction rolls back.
 *
 * @param {Object} job - The exhausted job.
 * @param {string} failureReason - Reason for the final failure.
 * @returns {Promise<Object>} The created DLQ record.
 */
const moveJobToDLQ = async (job, failureReason) => {
    return prisma.$transaction(async (tx) => {
        const deadLetterJob = await tx.deadLetterJob.create({
            data: {
                originalJobId: job.id,
                jobName: job.jobName,
                payload: job.payload,
                priority: job.priority,
                attempts: job.attempts,
                maxAttempts: job.maxAttempts,
                failureReason,
            },
        });

        await tx.job.delete({
            where: {
                id: job.id,
            },
        });

        return deadLetterJob;
    });
};

/**
 * Retrieves all jobs stored in the Dead Letter Queue.
 *
 * @returns {Promise<Object[]>} DLQ records, newest failures first.
 */
const findAll = async () => {
    return prisma.deadLetterJob.findMany({
        orderBy: {
            failedAt: "desc",
        },
    });
};

/**
 * Finds a DLQ record by its unique ID.
 *
 * @param {string} id - DLQ record ID.
 * @returns {Promise<Object|null>} DLQ record or null.
 */
const findById = async (id) => {
    return prisma.deadLetterJob.findUnique({
        where: {
            id,
        },
    });
};

/**
 * Permanently deletes a DLQ record.
 *
 * @param {string} id - DLQ record ID.
 * @returns {Promise<Object>} Deleted DLQ record.
 */
const deleteDLQJob = async (id) => {
    return prisma.deadLetterJob.delete({
        where: {
            id,
        },
    });
};

/**
 * Replays a failed job by creating a fresh pending job.
 *
 * The new job starts with zero failed attempts.
 * The original DLQ record is deleted only after the
 * new job has been created successfully.
 *
 * Both operations are atomic.
 *
 * @param {Object} deadLetterJob - Original DLQ record.
 * @returns {Promise<Object>} Newly created pending job.
 */
const replayJob = async (deadLetterJob) => {
    return prisma.$transaction(async (tx) => {
        const newJob = await tx.job.create({
            data: {
                jobName: deadLetterJob.jobName,
                payload: deadLetterJob.payload,
                status: "PENDING",
                priority: deadLetterJob.priority,
                attempts: 0,
                maxAttempts: deadLetterJob.maxAttempts,
            },
        });

        await tx.deadLetterJob.delete({
            where: {
                id: deadLetterJob.id,
            },
        });

        return newJob;
    });
};

module.exports = {
    moveJobToDLQ,
    findAll,
    findById,
    deleteDLQJob,
    replayJob,
};
