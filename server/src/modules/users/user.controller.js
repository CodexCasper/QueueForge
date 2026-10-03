const userService = require("./user.service");
const asyncHandler = require("../../utils/asyncHandler")

const getProfile = asyncHandler(async(req,res) => {

    const user = await userService.getProfile(req.user.id);

    res.status(200).json({
        success: true,
        data: user,
    });
});

const updateProfile = asyncHandler(async(req,res) => {

    const user = await userService.updateProfile(
        req.user.id,
        req.body
    );

    res.status(200).json({
        success: true,
        data:user,
    });
});

const changePassword = asyncHandler(async(req,res) =>{

    const { currentPassword , newPassword } = req.body;

    const result = await userService.changePassword(
        req.user.id,
        currentPassword,
        newPassword,
    );

    res.status(200).json({
        success: true,
        data: result,
    });
});

module.exports = {
    getProfile,
    updateProfile,
    changePassword
}