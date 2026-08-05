import { AuthRepository } from "../repository/auth.repository";
import { RegisterInput } from "../schemas/auth.schema";
import { UserDocument } from "../types/auth.types";
import { passwordHadler } from "../lib/bcrypt";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import { addHours } from "../lib/date";
import { generateOTP } from "../lib/otp";
import { ApiError } from "@/utils/apiError";

// intance AuthRepo
const authRepository = new AuthRepository();

// REGISTER SERVICE =========================================
export const registerService = async (data:RegisterInput):Promise<UserDocument>=>{
    
    // check if user already registerd
    const existedUser = await authRepository.findByEmail(data.email);

    // generate OTP
    const verifyCode = generateOTP();

       // Check is existed user isVerified true if yes thr erroer
        if(existedUser){
             if(existedUser.isVerified){
                throw new ApiError(409, "User Already existed")
            }else{
                const hashedPassword = await passwordHadler.hashPassword(data.password);
                existedUser.password = hashedPassword;
                existedUser.verifyCode = verifyCode;
                existedUser.verifyCodeExpiry = addHours(1);
                await existedUser.save()
            }
        }

    // hash password 
    const hashedPassword = await passwordHadler.hashPassword(data.password);

    const expiryDate = addHours(1);
    
    // create user
    const user = await authRepository.createUser({
        fullname:data.fullname.charAt(0).toUpperCase() + data.fullname.slice(1).toLowerCase(),
        phoneNumber:data.phoneNumber,
        email:data.email,
        password:hashedPassword,
        verifyCode,
        verifyCodeExpiry:expiryDate,
        isVerified:false
    });

    // send verification email
    await sendVerificationEmail(user.email,user.fullname,user.verifyCode);


    // return
     return user;

}
