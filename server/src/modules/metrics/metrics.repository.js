const prisma = require("../../config/prisma");

const getMetrics = async () => {

    const totalJobs = await primsa.job.count();
}

module.exports = {
    getMetrics,
    
}