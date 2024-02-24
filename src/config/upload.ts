import { Multerconfig } from "./types/type"
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (_req: Request,file: Multerconfig,cb: Function)=>{
       return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
 })

export const upload = multer({storage:storage})
