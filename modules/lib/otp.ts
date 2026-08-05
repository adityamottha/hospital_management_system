import { randomInt } from "node:crypto";

export function generateOTP(length:number=6):string{
    let otp:string = "";

    for (let i = 0; i <length; i++) {
        otp += randomInt(0,10)
    };

    return otp;
}