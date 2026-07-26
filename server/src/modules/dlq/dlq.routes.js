const express = require("express");
const { deleteFailedJob, getAllFailedJobs, replayJob } = require("./dlq.controller");

const router = express.Router();

router.get("/" , getAllFailedJobs);

router.delete("/:id" , deleteFailedJob);

router.post("/:id/replay" , replayJob);


module.exports = router;