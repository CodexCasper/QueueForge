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
const replayJob = async() => {

    return prisma.$transaction(async(tx) => {

        const 
    })
}
module.exports = {
    findAll,
    deleteDLQJob,
    moveJobToDLQ
}