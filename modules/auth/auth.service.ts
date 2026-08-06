import { AuthRepository } from "../repository/auth.repository";
import { RegisterInput } from "../schemas/auth.schema";
import { UserDocument } from "../types/auth.types";
import { passwordHadler } from "../lib/bcrypt";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import { addHours } from "../lib/date";
import { generateOTP } from "../lib/otp";
import { ApiError } from "@/utils/apiError";
import { registerSchema } from "../schemas/auth.schema";

// intance AuthRepo
const authRepository = new AuthRepository();

// REGISTER SERVICE =========================================
export const registerService = async (
  data: RegisterInput
): Promise<UserDocument> => {

     // validate input
     const result = registerSchema.safeParse(data);

    // check all fields are required!
    if (!result.success) {
        throw new ApiError(
            400,
            "Validation failed",
            result.error.issues.map((issue) => issue.message)
        );
    };
    const existedUser = await authRepository.findByEmail(data.email);

    const verifyCode = generateOTP();
    const expiryDate = addHours(1);

    if (existedUser) {

        if (existedUser.isVerified) {
            throw new ApiError(409, "User already exists");
        }

        existedUser.fullname =
            data.fullname.charAt(0).toUpperCase() +
            data.fullname.slice(1).toLowerCase();

        existedUser.phoneNumber = data.phoneNumber;
        existedUser.password = await passwordHadler.hashPassword(data.password);
        existedUser.verifyCode = verifyCode;
        existedUser.verifyCodeExpiry = expiryDate;

        await existedUser.save();

        await sendVerificationEmail(
            existedUser.email,
            existedUser.fullname,
            existedUser.verifyCode
        );

        return existedUser;
    }

    const hashedPassword = await passwordHadler.hashPassword(data.password);

    const user = await authRepository.createUser({
        fullname:
            data.fullname.charAt(0).toUpperCase() +
            data.fullname.slice(1).toLowerCase(),
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
    });

    await sendVerificationEmail(
        user.email,
        user.fullname,
        user.verifyCode
    );

    return user;
};