import { z } from "zod";

export const registerSchema = z.object({
  email: z
  .string()
  .trim()
  .min(1, "Email is required!")
  .email("Invalid email address"),

    password:
    z.string()
    .min(8,"Password must be at least 8 characters"),

    confirmPassword:
    z.string()
    .min(8,"Confirm password must be at least 8 characters"),

}).refine((data)=>{
    return data.password === data.confirmPassword
},
{
    message:"ComfirmPassword do not match with password!",
    path:["confirmPassword"]
}
)