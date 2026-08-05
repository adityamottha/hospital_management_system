import { AuthRepository } from "../repository/auth.repository";
import { RegisterInput } from "../schemas/auth.schema";
import { ApiError } from "../../utils/apiError";
import { IUser } from "../types/auth.types";
import { passwordHadler } from "../lib/bcrypt";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import { addHours } from "../lib/date";

// intance AuthRepo
const authRepository = new AuthRepository();

// REGISTER SERVICE =========================================
export const registerService = async (data:RegisterInput):Promise<IUser>=>{
    
    // check if user already registerd
    const existedUser = await authRepository.findByEmail(data.email);

    if(existedUser){
        true // TODO
    };

    // hash password 
    const hashedPassword = await passwordHadler.hashPassword(data.password);
    
    // create user
    const user =await authRepository.createUser({
        fullname:data.fullname.charAt(0).toUpperCase() + data.fullname.slice(1).toLowerCase(),
        phoneNumber:data.phoneNumber,
        email:data.email,
        password:hashedPassword,
    });

    // send verification email
    // return
     return user;

}
