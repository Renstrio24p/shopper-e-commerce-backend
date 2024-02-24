import { Request, Response } from "express"
import { app, modules } from "../config/config"
import { Users } from "../schema/user"
import { Expression } from "mongoose"

export const userRoutes = () => {

    // Registering users

    app.post('/signup', async (req: Request, res: Response): Promise<Expression> => {

        let checkForUser = await Users.findOne({ email: req.body.email })
        if (checkForUser) {
            return res.status(400).json({ success: false, errors: 'existing user found' });
        }
        let cart: { [key: number]: number } = {};

        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }


        const user = new Users({
            name: req.body.user,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        })

        await user.save()

        const data = {
            user: {
                id: user.id
            }
        }

        const token = modules.jwt.sign(data, 'secret_ecom')
        res.json({ success: true, token })

    })

    // Login

    app.post('/login', async (req: Request, res: Response) => {

        let user = await Users.findOne({ email: req.body.email })

        if (user) {
            const passCompare = req.body.password === user.password
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = modules.jwt.sign(data, 'secret_ecom')
                res.json({ success: true, token })
            }
            else {
                res.json({ success: false, errors: "Wrong Password" })
            }
        } else {
            res.json({success: false,errors:"Wrong Email address"})
        }

    })

}