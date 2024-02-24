import mongoose, { Schema } from "mongoose";
import { ProductInt } from "./types/schema";

const productSchema = new Schema<ProductInt>({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export const Product = mongoose.model<ProductInt>('products',productSchema)
export const ProductOffline = mongoose.model<ProductInt>('products',productSchema)