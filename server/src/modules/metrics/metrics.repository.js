const prisma = require("../../config/prisma");

const getMetrics = async () => {

    const totalJobs = await primsa.job.count();

    const jobsByStatus = await prisma.job.groupBy({

        by:["status"],
        _count: {
            status: "true",
        },
    });

}


module.exports = {
    getMetrics,
    
}