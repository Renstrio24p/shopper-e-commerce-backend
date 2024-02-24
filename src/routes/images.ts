import { Request, Response, Router } from "express"
import { upload } from "../config/upload"
import { app, modules, mongo, mongo_compass } from "../config/config"


export const imageEngine = () => {

    app.use('/images', modules.express.static('upload/images'))

    app.post('/upload', upload.single('product'), (req: Request, res: Response) => {
        res.json({
            success: 1,
            img_url: `http://localhost:${mongo_compass.port}/images/${req.file?.filename}`
        })
    })

}