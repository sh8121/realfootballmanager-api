import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const authMiddleware = (req: Request, res: Response, next: any) => {
    const token: string = req.token;
    if(!token){
        return res.status(403).json({
            message: '로그인하지 않았습니다.'
        });
    }
    
    return jwt.verify(token, req.app.get('jwt-secret'), (err: Error, decoded: any) => {
        if(err){
            return res.status(403).json({
                message: err.message
            });
        }

        req.app.set('info', decoded);
        return next();
    });
}