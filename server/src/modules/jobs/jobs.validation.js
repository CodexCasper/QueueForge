const { z } = require("zod");

const createJobSchema = z.object({
    jobName: z
    .string()
    .min(1, "Job Name is required")
    .max(100 , "Job Name is too long"),

    payload: z.object({}).passthrough(),
})

const updateStatusSchema = z.object({
    status: z.enum([
        "PENDING",
        "COMPLETED",
        "PROCESSING",
        "FAILED"
    ]),

});

module.exports = {
    createJobSchema,
    updateStatusSchema,
}