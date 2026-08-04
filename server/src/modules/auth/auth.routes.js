const express = require("express");

const authController = require("../../modules/auth/auth.controller");
const authenticate = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/register" , authController.register);

router.post("/login" , authController.login);

router.post("/refresh" , authController.refreshAccessToken);


router.post("/logout" ,authenticate, authController.logout);

router.get("/profile" ,authenticate, authController.getProfile);

router.patch("/profile" , authenticate, authController.updateProfile);

router.patch("/change-password" , authenticate, authController.changePassword);

module.exports = router;