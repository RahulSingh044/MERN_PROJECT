const {z} = require("zod");

const signupSchema = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least 3 characters long" }),

    mobile: z
        .string({ required_error: "Mobile number is required" })
        .trim()
        .length(10, { message: "Mobile number must be exactly 10 digits" })
        .regex(/^\d{10}$/, "Mobile number must contain only digits"),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message : "Invalid email address"}),


    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(255, { message: "Password must not exceed 255 characters" })
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/, 
               "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
});


const loginSchema = z.object({ 
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({message: "Invalid email address"}),

    password: z
    .string({required_error: "Password is required"})
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .max(255, "Password must not exceed 255 characters")
    // .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
})

module.exports = signupSchema, loginSchema;