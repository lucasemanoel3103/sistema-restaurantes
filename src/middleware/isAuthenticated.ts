import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

interface Payload{
    sub: string
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){

    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ")

    try {
        //Valida o token
        const { sub } = jwt.verify(
            token, 
            process.env.JWT_SECRET
        ) as Payload;

        req.user_id = sub

        return next();

        
    } catch (error) {
        return res.status(401).end
    }
}