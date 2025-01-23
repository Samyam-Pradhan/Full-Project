const {z} = require("zod");

// creating an object schema

const sigupSchema = z.object({
    username: z.string({required_error:"Name is required"})
    .trim()
    .min(3, {message:"Name must be atleast 3 characters"})
    .max(255,{message:"Name must not be more than 255 characters"}),
    email: z.string({required_error:"Email is required"})
    .trim()
    .min(3, {message:"Name must be atleast 3 characters"})
    .email({message: "Invalid email address"})
    .max(255,{message:"Name must not be more than 255 characters"}),
    phone: z.string({required_error:"Phone is required"})
    .trim()
    .min(10, {message:"Phone no  must be atleast 10 characters"})
    .max(20,{message:"Name must not be more than 20 characters"}),
    password: z.string({required_error:"Password is required"})
    .trim()
    .min(3, {message:"Name must be atleast 3 characters"})
    .max(255,{message:"Name must not be more than 255 characters"}),
    

});

module.exports =sigupSchema;