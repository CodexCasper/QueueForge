const prisma = require("../../config/prisma");

const getMetrics = async () => {

    const totalJobs = await primsa.job.count();

    const jobsByStatus = await prisma.job.groupBy({

        by:["status"],
        _count: {
            status: "true",
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

}


module.exports = {
    getMetrics,
    
}