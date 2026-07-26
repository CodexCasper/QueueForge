const express = require("express");
const { getAllWorkers, getWorkerById } = require("./workers.controller");

const router = express.Router();


router.get("/" , getAllWorkers);

router.get("/:id" , getWorkerById);


module.exports = router;