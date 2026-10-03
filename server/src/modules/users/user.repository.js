const prisma = require("../../config/prisma");

/**
 * @function findById
 * @description Finds a user by their unique ID.
 * @param {string} id - The unique ID of the user.
 * @returns {Promise<Object|null>} The user object if found, otherwise null.
 * @access private
 */
const findById = async(id) => {

    return prisma.User.findUnique({
        where:{
            id,
        },
    });
};

/**
 * @function findById
 * @description Finds a user by their unique ID.
 * @param {string} id - The unique ID of the user.
 * @returns {Promise<Object|null>} The user object if found, otherwise null.
 * @access private
 */
const updateProfile = async(id , data) => {

    return prisma.User.update({
        where:{
            id,
        },
        data,
    });
};

/**
 * @function updatePassword
 * @description Updates the password of a user.
 * @param {string} id - The unique ID of the user.
 * @param {string} password - The new hashed password.
 * @returns {Promise<Object>} The updated user object.
 * @access private
 */
const updatePassword = async(id , password) => {

    return prisma.User.update({
        where:{
            id,
        },
        data: {
            password,
        },
    });
};


/**
 * @function updateRefreshToken
 * @description Updates the refresh token of a user.
 * @param {string} id - The unique ID of the user.
 * @param {string|null} refreshToken -  null to clear it.
 * @returns {Promise<Object>} The updated user object.
 * @access private
 */
const updateRefreshToken = async(id , refreshToken) => {

    return prisma.User.update({
        where:{
            id,
        },
        data: {
            refreshToken,
        },
    });
};

module.exports = {
    updatePassword,
    updateRefreshToken,
    updateProfile,
    findById,
}