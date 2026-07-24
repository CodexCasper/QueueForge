const express = require("express");
const cors = require("cors");

const jobsRouter = require("./modules/jobs/jobs.routes");
const errorHandler = require("./middleware/error.middleware")


const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/jobs" , jobsRouter);

app.get("/" , (req,res) => {
    console.log("API is running correctly");
})


app.use(errorHandler);

module.exports = app;