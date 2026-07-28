const { z } = require("zod");

const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be atleast 3 characters long")
        .max(50, "Name can't be more than 50 characters"),
    
    email: z
          .string()
          .trim()
          .email("Invalid email password"),
    
    password: z
             .string()
             .min(8 , "Password must be 8 characters Long")
             .max(100 , "Password length can;t exceed 100 words"),      
});

const loginSchema = z.object({
    email: z
         .string()
         .trim()
         .email("Invalid email password"),

    password: z
            .string()
            .min(1, "Password is required"),   
});

const updateProfileSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name msut be alteast 3 characters long")
        .max(50 , "Name must not exceeds 50 characters ")
        .optional(),
});

const changePasswordSchema = z.object({
    currentPassword: z
                    .string()
                    .min(1, "Current Password is required"),

    newPassword: z
        .string()
        .min(8 , "New password must be 8 characters long")
        .max(100 ,"Password Length can't exceed 100 characters"),               
});


module.exports = {
    registerSchema,
    loginSchema,
    updateProfileSchema,
    changePasswordSchema
}