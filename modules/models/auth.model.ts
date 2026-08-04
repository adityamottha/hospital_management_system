import mongoose,{model, Schema} from "mongoose";
import {IUser} from "../types/auth.types";

const authUserSchema = new Schema<IUser>({
    fullname:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
        type:String,
        trim:true,
        unique:true,
        index:true
    },

    phoneNumber:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true
    },

    password:{
        type:String,
        required:true,
        trim:true,
        select:false,
    },

    passwordChangedAt:{
        type:Date,
        default:Date.now
    },

    avatar:{
        type:String, 
    },

    role:{
        type:String,
        enum:["Admin", "Patient", "Doctor", "Receptionist"],
        default:"Patient",
        required:true
    },

    isVerified:{
        type:Boolean,
        default:false
    },

    verifiedAt:{
        type:Date,
        // default:Date.now
    },

    isAccountDeleted:{
        type:Boolean,
        default:false
    },
    accountDeletedAt:{
        type:Date,
        default:Date.now
    },

    isAccountBlocked:{
        type:Boolean,
        default:false
    },
    
    accountBlockedBy:{
        type:Schema.Types.ObjectId,
        ref:"AuthUser"
    }

},{timestamps:true})

const AuthUser =
  mongoose.models.AuthUser || model<IUser>("AuthUser", authUserSchema);

export default AuthUser;