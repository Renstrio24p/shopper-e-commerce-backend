import { Document } from "mongoose";

export type Product = {
    name: string,
    image: string,
    category: string,
    new_price: number,
    old_price: number,
    img_url: string,
    success: boolean
}

export interface User {
    id: number;
}

export interface RequestUser extends Request {
    user: User;
}


export interface UserDocument extends Document {
    cartData: { [key: number]: number }; 
}