import AuthUser from "../../modules/models/auth.model";
import { UserDocument } from "../types/auth.types";


export class AuthRepository{
  private model = AuthUser;

  // FIND BY ID
   async findById(id: string): Promise<UserDocument> {
    return this.model.findById(id).exec();
  };

  // FIND BY EMAIL
  async findByEmail(email:string):Promise<UserDocument>{
    return this.model.findOne({email}).exec();
  };

  // FIND BY ROLE 
  async findByRole(role:string):Promise<UserDocument>{
    return this.model.findOne({role}).exec();
  }

  // FIND BY PHONE-NUMBER
   async findByPhoneNumber(phoneNumber:string):Promise<UserDocument>{
    return this.model.findOne({phoneNumber}).exec();
  };

  // CREATE USER
  async createUser(data: Partial<UserDocument>):Promise<UserDocument>{
    return this.model.create(data);
  };

}