const { z } = require("zod");

/**
 * 
 */
const updateProfileSchema = z.object({

    name: z
    .string()
    .min(1, "Name is too short")
    .max(100, "Name is too long")
    .optional(),

    email: z
    .string()
    .email("Invalid Email")
    .optional()
});


const changePasswordSchema = z.object({

    currentPassword: z
    .string()
    .min(1,"currentPassword is required"),

    newPassword: z
    .string()
    .max(8, "newpassword must be at least 8 characters"),
});

module.exports = {
    updateProfileSchema,
    changePasswordSchema,
};

