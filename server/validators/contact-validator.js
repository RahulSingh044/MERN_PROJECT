const {z} = require("zod");

const contactSchema = z.object({
    username: z
    .string({required_error: "Name is required"})
    .trim()
    .min(3, "Name must be at least 3 characters long"),

    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({required_error: "Invalid email address"}),

    message: z
    .string({required_error: "Message is required"})
    .trim()
    .min(15, "Message must be at least 15 characters long")
    .max(250, "Message must be atmost 250 characters long"),
})

module.exports = contactSchema;