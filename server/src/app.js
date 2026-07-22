const express = require("express");
const cors = require("cors");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

app.get("/" , (req,res) => {
    console.log("API is running correctly");
})


module.exports = app;