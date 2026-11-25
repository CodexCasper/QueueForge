/**
 * simulates execution of a background job
 * 
 * set payload.simulatefailure to true to delibrately trigger a failure to testing workers retry and DLQ behaviour
 * 
 * @param {Object} job - The Claimed Job
 * @param {string} job.id - unique job indentifier
 * @param {string} job.jobname - name of the job
 * @param {string} job.payload - job-specific data
 * @returns {Promise<void>} Resolves when processign succeeds
 * @throws {error} when simulatedd failure enabled
 */
const processJob = async(job) => {
    console.log(`Processing: ${job.jobName} (ID: ${job.id})... `)

    //simulate the time required to execute a job
    await new Promise((resolve) => {
        setTimeout(resolve , 3000);
    })

    const payload = job.payload ?? {};

    //delibrately fail jobs when testing retry behaviour
    if (payload.simulateFailure === true) {
        throw new Error("simulated job failure for retry testing");
        
    }

    // Scenario 2: The job fails a specified number of times,
    // then succeeds on a later execution.
    if (
        Number.isInteger(payload.failUntilAttempt) &&
        payload.failUntilAttempt > job.attempts
    ) {
        throw new Error(
            `Simulated temporary failure. Previous failures: ${job.attempts}`
        );
    }

    console.log(`Job Finished: ${job.jobName} (Id: ${job.id})`);
}

module.exports = {
    processJob,
}