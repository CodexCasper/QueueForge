const processJob = async(job) => {

    console.log(`Processing: ${job.jobName}...`);

    await new Promise((resolve) => {
        setTimeout(resolve , 3000);
    })

    throw new Error("pta nhai");
    
    console.log("Job Finished");
} 

module.exports = {
    processJob,

}