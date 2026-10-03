const ApiError = require("../../utils/ApiError");
const userRepository = require("./user.repository");

const getProfile = async(userId) => {

    const user = await userRepository.findById(userId);

    if(!user) {
        throw new ApiError(404 , "User not found");
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};

const updateProfile = async(userId , data) => {
    
    const user = await userRepository.findById(userId);

    if(!user) {
        throw new ApiError(404 , "user not found");
    };

    const updatedUser = await userRepository.updateProfile({
        userId,
        data
    });

    return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
    };
};

const changePassword = async(
    userId,
    currentPassword,
    newPassword,
) => {

    const user = await userRepository.findById(userId);

    if(!user) {
        throw new ApiError(404,"User not found");
    }

    const isPassworValid = await bcrypt.compare(
        currentPassword,
        user.password,
    );

    if(!isPassworValid) {

        throw new ApiError(
            401,
            "currentPassword is incorrect"
        );
    }

    const hashedPassword = await bcrypt.hash(
        newPassword,
        10
    );

    await userRepository.updatePassword(
        userId,
        hashedPassword
    );

    await userRepository.updateRefreshToken(
        userId,
        null
    );

    return{
        message: "Password changed successfully. Please login again.",
    };
};

module.exports = {
    getProfile,
    updateProfile,
    changePassword,
}