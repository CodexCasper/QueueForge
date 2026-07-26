const prisma = require("../../config/prisma");

const getMetrics = async () => {

    const totalJobs = await prisma.job.count();

    const jobsByStatus = await prisma.job.groupBy({

        by: ["status"],
        _count: {
            status: true,
        },
    });

    const statusCounts = {
        pending: 0,
        processing: 0,
        completed: 0,
        failed: 0
    };

    jobsByStatus.forEach((job) => {
        statusCounts[job.status.toLowerCase()] = job._count.status;            // statusCounts["pending"] = 2;
    });

    const workerByStatus = await prisma.worker.groupBy({

        by:["status"],
        _count: {
            status: true,
        },
    });

    const workerCounts = {
        active:0,
        inactive:0,
    };

    workerByStatus.forEach((worker) => {
        workerCounts[worker.status.toLowerCase()] = worker._count.status;
    })

    const totalDlqJobs = await prisma.DeadLetterJob.count();

    return {
        jobs: {
            total: totalJobs,
            ...statusCounts
        },
        workers: workerCounts,
        dlq: {
            total: totalDlqJobs,
        },
    };
};


module.exports = {
    getMetrics,
    
}