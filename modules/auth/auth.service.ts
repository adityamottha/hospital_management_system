import { AuthRepository } from "../repository/auth.repository";
import { RegisterInput } from "../schemas/auth.schema";
import { ApiError } from "../utils/apiError";
import { IUser } from "../types/auth.types";

// intance AuthRepo
const authRepository = new AuthRepository();

// REGISTER SERVICE =========================================
export const registerService = async (data:RegisterInput):Promise<IUser>=>{
    // check email is required
    if(!data.email){
        throw new ApiError(400,"Email-Address is required field")
    };

    // check password is required
    if(!data.password){
        throw new ApiError(400,"Password is required field")
    };

    // check password is required
    if(!data.confirmPassword){
        throw new ApiError(400,"confirmPassword is required field")
    };

    // check if user already registerd
    const existedUser = await authRepository.findByEmail(data.email);

    if(existedUser){
        throw new ApiError(409, "User Already registered!")
    };

    // create user
    return await authRepository.createUser({
        email:data.email,
        password:data.password,
        isVerified:true,
        verifiedAt: new Date()
    });

}
