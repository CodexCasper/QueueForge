const {processJob} = require("./processor");
const jobsRepository = require("../modules/jobs/jobs.repository");
const workersRepository = require("../modules/workers/workers.repository");
const dlqRepository = require("../modules/dlq/dlq.repository");
const sleep = require("../utils/sleep");


const startWorker = async () => {

    console.log("Runnning from worker");

    const worker = await workersRepository.createWorker("worker-1");

    console.log(`worker ${worker.workerName} registered...`);


    const heartbeatInterval = setInterval(() => {

        return workersRepository.updateHeartbeat(worker.id);

    }, 5000);


    process.on("SIGNINT", async() => {     //process.on(eventName, callbackFunction);

        console.log("Shutting down the worker....")

        clearInterval(heartbeatInterval);

        await workersRepository.markInactive(worker.id);

        console.log("Worker marked as Inactive..");

        process.exit(0);
    })


    while(true){

        const processingJob = await jobsRepository.claimNextJob();
    
       if (!processingJob) {
        console.log("No pending jobs found.");

        await sleep(5000);

        continue;
    }
    
        try {
            
            await processJob(processingJob);
        
            await jobsRepository.updateStatus(
                processingJob.id,
                "COMPLETED"
            );
        
            console.log("job completed");

        } catch (error) {
            
            console.error("Job Failed:", error.message);

            const updatedJob = await jobsRepository.incrementAttempts(
                processingJob.id
            );

            if(updatedJob.attempts < updatedJob.maxAttempts){

                await jobsRepository.updateStatus(
                    updatedJob.id,
                    "PENDING"
                );

                console.log("Retrying Logic...");
            } else {

                await dlqRepository.moveToDLQ(
                    updatedJob,
                    error.message
                );

                console.log("Job moved to DLQ");
            }
        }
    }
}

module.exports={
    startWorker,
}

