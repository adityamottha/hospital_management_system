import { AuthRepository } from "../repository/auth.repository";
import { RegisterInput } from "../schemas/auth.schema";
// import { ApiError } from "../../utils/apiError";
import { IUser } from "../types/auth.types";
import { passwordHadler } from "../lib/bcrypt";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import { addHours } from "../lib/date";
import { generateOTP } from "../lib/otp";
import { ApiError } from "@/utils/apiError";

// intance AuthRepo
const authRepository = new AuthRepository();

// REGISTER SERVICE =========================================
export const registerService = async (data:RegisterInput):Promise<IUser>=>{
    
    // check if user already registerd
    const existedUser = await authRepository.findByEmail(data.email);

    // generate OTP
    const verifyCode = generateOTP();

       // Check is existed user isVerified true if yes thr erroer
        if(existedUser.isVerified){
            throw new ApiError(409, "User Already existed")
        };

        // check if user existed but not verified loop of steps
        // 1) generate OTP 
        // 2) Hashed Password
        // 1) expiry date
    
        if(existedUser.isVerified === false ){
             const hashedPassword = await passwordHadler.hashPassword(data.password);
             existedUser.password = hashedPassword;
             existedUser.verifyCode = verifyCode;
             existedUser.verifyCodeExpiry = addHours(1);
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
