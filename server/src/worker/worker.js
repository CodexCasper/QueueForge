const {processJob} = require("./processor");
const jobsRepository = require("../modules/jobs/jobs.repository");
const sleep = require("../utils/sleep");

const startWorker = async () => {

    console.log("Runnning from worker");

    while(true){

        const job = await jobsRepository.findNextPendingJob();
    
       if (!job) {
        console.log("No pending jobs found.");

        await sleep(5000);

        continue;
    }
    
        const processingJob = await jobsRepository.updateStatus(
            job.id,
            "PROCESSING"
        )
    
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

                await jobsRepository.updateStatus(
                    updatedJob.id,
                    "FAILED"
                );

                console.log("permanently deleted");
            }
        }
    }
}

module.exports={
    startWorker,
}

