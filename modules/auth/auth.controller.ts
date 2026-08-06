import { registerService } from "./auth.service";
import { ApiResponse } from "../../utils/apiResponse";
import { NextResponse } from "next/server";
import { asyncHandler } from "@/utils/asyncHandler";

export class AuthController{
    static registerController(req:Request){
        return asyncHandler(async ()=>{
             // get body from json
        const body = await req.json()

        // call service function and pass body
        const user = await registerService(body)

        // return response
        return NextResponse.json(
            new  ApiResponse(200,user,"User registerd successfully!"),
            { status:200 }
        )
        })
    }
}