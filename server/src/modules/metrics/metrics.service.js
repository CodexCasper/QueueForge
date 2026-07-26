const metricsRepository = require("./metrics.repository");

const getMetrics = async () => {

    return await metricsRepository.getMetrics();

}

module.exports = {
    getMetrics,
    
}