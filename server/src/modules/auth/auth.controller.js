const authService = require("../auth/auth.services");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");

const {
    registerSchema,
    loginSchema,
    updateProfileSchema,
    changePasswordSchema,
} = require("./auth.validation");
const { success } = require("zod");


const register = asyncHandler(async( req ,res) => {

    const validatedData = await registerSchema.parse(req.body);

    const result = await authService.register(validatedData);

    res.cookie("refreshToken" , result.refreshToken, {  //res.cookie(NAME, VALUE, OPTIONS);
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ,
        samesite: "Strict",
        maxAge: 7 * 24 * 60 * 60 *1000,
    });

    return res.status(201).json({
        success: true,
        data: {
            user: result.user,
            accessToken: result.accessToken,
        },
    });

});

const login = asyncHandler(async(req, res) => {

    const validatedData = await loginSchema.parse(req.body);

    const result = await authService.login(validatedData);

    res.cookie("refreshToken" , result.refreshToken , {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: "strict",
        maxAge: 7 * 24 * 60 * 1000,
    });

    return res.status(200).json({
        success: true,
        data: {
            user: result.user,
            accessToken: result.accessToken,
        },
    });

});


const refreshAccessToken = asyncHandler(async(req, res) => {

    const refreshToken = req.cookies?.refreshToken;

    if(!refreshToken) {
        throw new ApiError(401, "Refresh Token not found");
    };

    const result = await authService.refreshAccessToken(refreshToken);

    return res.status(200).json({
        success: true,
        data: result,
    });

});

const logout = asyncHandler(async(req, res) => {

    await authService.logout(req.user.id);

    res.clearCookie("refreshToken" , {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: "strict",
    });

    return res.status(200).json({
        success: true,
        message: "Logged Out Successfully",
    });
});


const getProfile = asyncHandler(async(req,res) => {

    const user = await authService.getProfile(req.user.id);

    return res.status(200).json({
        success: true,
        data: user,
    });
});

const updateProfile = asyncHandler(async(req, res) => {

    const validatedData = updateProfileSchema.parse(req.body);

    const user = await authService.updateUserProfile(
        req.user.id,
        validatedData,
    );

    return res.status(200).json({
        success: true,
        data: user,
    });
});

const changePassword = asyncHandler(async(req ,res) => {

    const validatedData = changePasswordSchema.parse(req.body);

    const result = await authService.changePassword(
        req.user.id,
        validatedData.currentPassword,
        validatedData.newPassword,
    );

    res.clearCookie("refreshToken" , {
        httpOnly: true,
        secure: procss.env.NODE_ENV === "production",
        samesite: "strict",
    });

    return res.status(200).json({
        success: true,
        message: result.message,
    });
});


module.exports = {
    register,
    login,
    refreshAccessToken,
    logout,
    getProfile,
    updateProfile,
    changePassword,
};