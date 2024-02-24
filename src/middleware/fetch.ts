import { NextFunction, Request, Response } from "express";
import { modules } from "../config/config";
import { RequestUser } from "../routes/types/routes";

export const fetchUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    } else {
        try {
            const data = modules.jwt.verify(token, 'secret_ecom');
            const reqUser = req as unknown;
            (reqUser as RequestUser).user = (data as RequestUser)['user']; 
            next();
        } catch (error) {
            console.error("Error verifying token:", error);
            res.status(401).send({ errors: "Please authenticate using a valid token" });
        }
    }
};
