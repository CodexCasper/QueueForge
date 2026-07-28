const { ZodError } = require("zod");

const errorHandler = (err, req, res, next) => {

    console.log(err);

    if(err instanceof ZodError){

        res.status(400).json({
            success:false,
            message:err.issues[0].message,
        });

    }

    const statusCode = err.statusCode || 500;
    
    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });

}

module.exports = errorHandler