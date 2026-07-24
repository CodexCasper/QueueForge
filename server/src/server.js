require("dotenv").config();

const app = require("./app");
const { startWorker } = require("./worker/worker");


const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {

    console.log(`the server is running on http://localhost:${PORT}`);

    startWorker();
});