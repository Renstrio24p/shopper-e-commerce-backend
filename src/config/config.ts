import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import { secrets } from "./private/private";
import { Config } from "./types/type";

export const modules = {
    express: express,
    cors: cors,
    jwt: jwt,
    mongoose: mongoose
}

// Online DB
const mongodb = 'e-commerce'

// Offline DB
const mongodb_offline = 'mongo_service'

export const mongo: Config = {
    port: 5100,
    dest_port: 5600,
    admin_port: 5700,
    url: `mongodb+srv://${secrets}@gp2-cloud.pefe5tc.mongodb.net/${mongodb}?retryWrites=true&w=majority`,
}

export const mongo_compass: Config = {
    database: mongodb_offline,
    port: 5100,
    dest_port: 5600,
    admin_port: 5700,
    collection: 'e-commerce',
    url: `mongodb://localhost:27017/${mongodb_offline}`
}

export const app = express()




