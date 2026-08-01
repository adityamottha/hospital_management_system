import {Types} from "mongoose";

export interface IUser{
    fullname:string;
    email?:string;
    phoneNumber:string;
    password:string,
    passwordChangedAt:Date,
    avatar?:string,
    role:"Admin" | "Patient" | "Doctor" | "Receptionist";
    isVerified:boolean;
    verifiedAt:Date;
    isAccountDeleted:boolean;
    accountDeletedAt:Date;
    isAccountBlocked:boolean,
    accountBlockedBy:Types.ObjectId
};
