const prisma = require("../../config/prisma");

const create = async (userData) => {

    return prisma.User.create({
        data: userData,
    });

};

const findByEmail = async (email) => {

    return prisma.user.findUnique({
        where: {
            email,
        },
    });

};

const findById = async (id) => {
    
    return prisma.User.findUnique({
        where: {
            id,
        },
    });

};

const updateRefreshToken = async (id , refreshToken) => {
    
    return prisma.user.update({
        where: {
            id,
        }, 
        data: {
            refreshToken
        },
    });

};

const updateProfile = async (id , data) => {
    
    return prisma.User.update({
        where: {
            id,
        },
        data,
    });

};

const updatePassword = async (id , password) => {
    
    return prisma.User.update({
        where: {
            id,
        },
        data: {
            password
        },
    });

};


module.exports = {
    create,
    findByEmail,
    findById,
    updatePassword,
    updateProfile,
    updateRefreshToken
}