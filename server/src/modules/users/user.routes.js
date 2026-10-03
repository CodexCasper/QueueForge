const express = require("express");

const validate = require("../../middleware/validate.middleware");
const authenticate = require("../../middleware/auth.middleware");
const userController = require("./user.controller")

const {
    updateProfileSchema,
    chnagePasswordSchema,
} = require("./user.validation");


const router = express.Router()

/**
 * @route GET api/users/me
 * @description get the respective user id
 * @access private
 * @note here we do not want api/users/123 bcoz that we have already verified through middleware
 * it prevents users from accessing other user profile by preventing api/users/456
 */
router.get(
    "/me",
    authenticate,
    userController.getProfile
);

router.patch(
    "/me",
    authenticate,
    validate(updateProfileSchema),
    userController.updateProfile
);

router.update(
    "/change-password",
    authenticate,
    validate(chnagePasswordSchema),
    userController.changePassword
);

module.exports = router;