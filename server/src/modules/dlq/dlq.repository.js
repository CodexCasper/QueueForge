const prisma = require("../../config/prisma");

const moveJobToDLQ = async (job , failureReason) => {

    return prisma.$transaction(async (tx) => {

        await tx.DeadLetterJob.create({
           data: {
               originalJobId: job.id,
               jobName: job.jobName,         
               payload: job.payload,       
               priority: job.priority,        
               attempts: job.attempts,        
               maxAttempts: job.maxAttempts,    
               failureReason  
            },
        });

        await tx.job.delete({
            where: {
                id: job.id,
            },
        });

    });
}

const findAll = async () => {

    return prisma.DeadLetterJob.findMany({
        orderBy: {
            failedAt: "desc",
        },
    });
};

const deleteDLQJob = async (id) => {

    return prisma.DeadLetterJob.delete({
        where: {
            id,
        },
    });
};

// replay jobs
const replayJob = async(id) => {

    return prisma.$transaction(async(tx) => {

        const deadLetterJob = await tx.DeadLetterJob.findUnique({
            where: {
                id,
            },
        });

        if(!deadLetterJob) {
            throw new Error("Dead Letter Job Not Found")
        }

        await tx.job.create({
            data: {
                jobName: deadLetterJob.jobName,
                payload: deadLetterJob.payload,
                status:"PENDING",
                priority: deadLetterJob.priority,
                attemtps: 0,
                maxAttempts: deadLetterJob.maxAttempts,
            },
        });

        await tx.deadLetterJob.delete({
            
            where: {
                id: deadLetterJob.id,
            },
        });

    });
};


module.exports = {
    findAll,
    deleteDLQJob,
    moveJobToDLQ,
    replayJob,

}