const express = require("express");
const { deleteFailedJob, getAllFailedJobs } = require("./dlq.controller");

const router = express.Router();

router.get("/" , getAllFailedJobs);

router.delete("/:id" , deleteFailedJob);

module.exports = router;