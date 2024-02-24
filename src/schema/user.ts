import mongoose, { Schema } from "mongoose";
import { UserInt } from "./types/schema";

const userSchema = new Schema<UserInt>({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password : {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

export const Users = mongoose.model<UserInt>('users',userSchema)