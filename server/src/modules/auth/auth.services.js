const bcrypt = require("bcrypt");
const authRepository = require("./auth.repository");

const { generateAccessToken , generateRefreshToken , verifyRefreshToken , verifyAccessToken } = require("../../config/jwt");

const register = async ({ name , email , password }) => {
    
    const existingUser = await authRepository.findByEmail(email);

    if(existingUser) {
        throw new Error("User Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const user = await authRepository.create({
        name,
        email,
        password: hashedPassword,
    });

    const payload  = {
        id: user.id,
        role: user.role,
    };

    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    await authRepository.updateRefreshToken(user.id , refreshToken);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        accessToken,
        refreshToken,
    };

};


const login = async ({ email , password }) => {
    
    const user = await authRepository.findByEmail(email);

    if(!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password , user.password);

    if(!isPasswordValid) {
        throw new error("Invalid email or Password");
    }

    const payload =  {
        id: user.id,
        role: user.role
    }

    const accessToken = await authRepository.generateAccessToken(payload);
    const refreshToken = await authRepository.generateRefreshToken(payload);

    await authRepository.updateRefreshToken(user.id , refreshToken);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        accessToken,
        refreshToken
    };

}



const refreshAccessToken = async (refreshToken) => {
    
    const decoded = verifyRefreshToken(refreshToken);

    const user = await authRepository.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
        throw new Error("refresh token Invalid");
    }

    const payload = {
        id: user.id,
        role: user.role
    }

    const accessToken = await generateAccessToken(payload);

    return {
        accessToken,
    };

};



const logout = async (userId) => {
    await authRepository.updateRefreshToken(userId, null);

    return {
        message: "User logged out successfully",
    };

};



const getProfile = async (userId) => {
    
    const user = await authRepository.findById(userId);

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };

};



const updateUserProfile = async (userId,data) => {

    const updatedUser = await authRepository.updateProfile(
        userId,
        data
    );

    return {
        id: updatedUser.id,
        name: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
    };

};



const changePassword = async (userId , currentPassword , newPassword) => {
    
    const user = await authRepository.findById(userId);

    if(!user) {
        throw new Error("user not found");
        
    }

    const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
    );


    if (!isPasswordValid) {
        throw new Error("Current password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(newPassword , 10);

    await authRepository.updatePassword(userId , hashedPassword);

    await authRepository.updateRefreshToken(userId, null);

    return {
        message:"Password changed successfully. Please login Again."
    };

};


module.exports = {
    register,
    login,
    refreshAccessToken,
    logout,
    getProfile,
    updateUserProfile,
    changePassword
}