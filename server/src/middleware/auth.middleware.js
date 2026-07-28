const { verifyAccessToken } = require("../config/jwt");
const ApiError = require("../utils/ApiError");

const authenticate = (req , res , next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(
            new ApiError(401 , "Access Token required")
        );
    }

    const token = authHeader.split(" ")[1];

    try {
        
        const decoded = verifyAccessToken(token);

        req.user = {
            id: decoded.id,
            role: decoded.id,
        };

        next();
    } catch (error) {
        
        next(
            new ApiError(401 ,"Invalid or expired Access Token")
        );
    };

};

module.exports = authenticate