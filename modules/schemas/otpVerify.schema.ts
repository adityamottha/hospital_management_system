import { z } from "zod";

export const otpVerifySchema = z.object({
    email: z
        .string({
            error: "Email is required",
        })
        .trim()
        .email("Invalid email address"),

    verifyCode: z
        .string({
            error: "OTP is required",
        })
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d+$/, "OTP must contain only numbers"),
});

export type VerifyOtpInput = z.infer<typeof otpVerifySchema>;