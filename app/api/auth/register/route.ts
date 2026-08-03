import { AuthController } from "@/modules/auth/auth.controller";

// register route
export async function POST(req:Request){
    return AuthController.registerController(req)
}