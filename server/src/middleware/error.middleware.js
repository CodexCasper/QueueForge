const { ZodError } = require("zod");

const errorHandler = (err, req, res, next) => {

    console.log(err);

    if(err instanceof ZodError){

        res.status(400).json({
            success:false,
            message:err.issues[0].message,
        });

    }

    res.status(400).send({
        success: false,
        message: err.message || "something went wrong"
    });
}

module.exports = errorHandler