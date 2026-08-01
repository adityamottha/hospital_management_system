import AuthUser from "../../modules/models/auth.model";
import { IUser } from "../types/auth.types";
import { Schema } from "mongoose";

export class AuthRepository{
  private model = AuthUser;

  async findById(id: string): Promise<IUser | null> {
    return this.model.findById(id).exec();
  }
}