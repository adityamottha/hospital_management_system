import { resend } from "@/modules/lib/resend";
import VerificationEmail from "@/emails/verificationEmail";
import { ApiError } from "./apiError";
// import { ApiResponse } from "./apiResponse";

// REGISTER VERIFICATION EMAIL
export const  sendVerificationEmail = async(
    email:string,
    fullname:string,
    verifyCode:string
)=>{
    try {
  const verifyEmail = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject: 'DR. AD-Clinic | Verification Code',
    react: VerificationEmail({fullname,otp:verifyCode}),
  });

    } catch (error) {
        throw new ApiError(500,`Error to sending verification email : ${error instanceof Error ? error.message:"Verification code error!"}`)
    }
}