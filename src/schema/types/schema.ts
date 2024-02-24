
import { Date, Document } from "mongoose";

type modelString = {
    type: String,
    required: boolean
}

type modelNumber = {
    type: Number,
    required: boolean
}

type modelDate = {
    type: Date,
    default: Date
}

type modelBoolean = {
    type: Boolean,
    default: boolean
}

type modelObject = {
    type: Object
}

export interface ProductInt extends Document {
    id: modelNumber,
    name: modelString,
    image: modelString,
    category: modelString,
    new_price: modelNumber,
    old_price: modelNumber, 
    date: modelDate,
    available: modelBoolean,
}

export interface UserInt extends Document {
    name: modelString,
    email: modelString,
    unique: boolean,
    password: modelString,
    cartData: {
        [key: string]: any;
    };
    date: modelDate
}