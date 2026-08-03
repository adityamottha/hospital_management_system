import bcrypt from "bcrypt";
import { ApiError } from "../utils/apiError";

export class passwordHadler{
    
    private static readonly SALT_ROUNDS = 10;

    // hash password
static async hashPassword(password:string):Promise<string>{
    try {
        return await bcrypt.hash(password,this.SALT_ROUNDS)
    } catch (error) {
       throw new ApiError(500, `Password failed to hash! : ${error instanceof Error ? error.message : "Unknown error"}`)
    }
};

// compare password
 static async comparePassword(password:string, hashedPassword:string):Promise<boolean>{
    try {
        return await bcrypt.compare(password,hashedPassword);
    } catch (error) {
        throw new ApiError(500,`Failed to compare password! : ${error instanceof Error ? error.message : "Unknown error"}`)
    }
}

}
