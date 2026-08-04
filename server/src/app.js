const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const jobsRouter = require("./modules/jobs/jobs.routes");
const dlqRoutes = require("./modules/dlq/dlq.routes");
const workersRoutes = require("./modules/workers/workers.routes");
const metricsRoutes = require("./modules/metrics/metrics.routes");
const authRoutes = require("./modules/auth/auth.routes");

const errorHandler = require("./middleware/error.middleware")

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/jobs" , jobsRouter);
app.use("/api/dlq" , dlqRoutes);
app.use("/api/workers" , workersRoutes);
app.use("/api/metrics" , metricsRoutes);
app.use("/api/auth" , authRoutes);


app.use(errorHandler);

app.get("/" , (req,res) => {
    console.log("API is running correctly");
})




module.exports = app;