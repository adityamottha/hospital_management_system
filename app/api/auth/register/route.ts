import { AuthController } from "@/modules/auth/auth.controller";
import  dbConnect  from "../../../../modules/lib/dbConnect";

// register route
export async function POST(req:Request){
    await dbConnect();
    return AuthController.registerController(req)
}