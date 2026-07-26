const prisma = require("../../config/prisma");

const findAll = async () => {

}

const deleteDLQJob = async () => {

}

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

module.exports = {
    findAll,
    deleteDLQJob
}