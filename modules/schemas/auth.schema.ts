import { z } from "zod";

export const registerSchema = z.object({
    fullname: 
    z.string()
    .trim()
    .min(3,"Name is required!")
    .max(20,"Max length of fullname is 20")
    ,
    email: z
    .string()
    .trim()
    .min(5, "Email is required!")
    .max(30,"Email is required!")
    .email("Invalid email address"),

    phoneNumber: z
    .string()
    .trim()
    .min(3, "Number is required!")
    .max(20, "Number must be less then 20!"),

    password:
    z.string()
    .min(8,"Password must be at least 8 characters")
    .max(35, "Password must be less then 35!"),

    confirmPassword:
    z.string()
    .min(8,"Confirm password must be at least 8 characters")
    .max(35, "Password must be less then 35!"),

}).refine((data)=>{
    return data.password === data.confirmPassword
},
{
    message:"ComfirmPassword do not match with password!",
    path:["confirmPassword"]
}
)


export type RegisterInput = z.infer<typeof registerSchema>;