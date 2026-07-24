const express = require("express");
const jobsController = require("./jobs.controller")

const router = express.Router();

router.post("/" , jobsController.createJob);

router.get("/" , jobsController.getAllJobs);

router.get("/:id" , jobsController.getJobById);

router.patch("/:id/status" , jobsController.updateJobStatus);

router.delete("/:id" , jobsController.deleteJob);

module.exports = router;