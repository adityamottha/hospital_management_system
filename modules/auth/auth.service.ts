import { AuthRepository } from "../repository/auth.repository";
import { RegisterInput } from "../schemas/auth.schema";
import { ApiError } from "../utils/apiError";
import { IUser } from "../types/auth.types";
import { passwordHadler } from "../lib/bcrypt";

// intance AuthRepo
const authRepository = new AuthRepository();

// REGISTER SERVICE =========================================
export const registerService = async (data:RegisterInput):Promise<IUser>=>{
    
    // check if user already registerd
    const existedUser = await authRepository.findByEmail(data.email);

    if(existedUser){
        throw new ApiError(409, "User Already registered!")
    };

    // hash password 
    const hashedPassword = await passwordHadler.hashPassword(data.password);
    
    // create user
    return await authRepository.createUser({
        email:data.email,
        password:hashedPassword,
        isVerified:true,
        verifiedAt: new Date()
    });

}
