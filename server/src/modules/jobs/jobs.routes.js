const express = require("express");
const jobsController = require("./jobs.controller")
const authenticate = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/" ,authenticate, jobsController.createJob);

router.get("/" ,authenticate, jobsController.getAllJobs);

router.get("/:id" ,authenticate, jobsController.getJobById);

router.patch("/:id/status" ,authenticate, jobsController.updateJobStatus);


module.exports = router;