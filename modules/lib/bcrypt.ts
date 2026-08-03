import bcrypt from "bcrypt";

// hash password
export const hashPassword = (password:string):Promise<string> =>{
    return bcrypt.hash(password,10)
};

// compare password
export const comparePassword = (password:string, hashPassword:string):Promise<boolean> =>{
    return bcrypt.compare(password,hashPassword);
}
