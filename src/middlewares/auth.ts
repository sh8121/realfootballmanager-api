import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import config from '../config'

const authMiddleware = (secretKey: string) => {
    return (req: Request, res: Response, next: any) => {
        const token: string = req.token;
        if(!token){
            return res.status(403).json({
                message: '로그인하지 않았습니다.'
            });
        }
        
        return jwt.verify(token, secretKey, (err: Error, decoded: any) => {
            if(err){
                return res.status(403).json({
                    message: err.message
                });
            }
    
            req.app.set('info', decoded);
            return next();
        });
    }
}

export const teamAuth = authMiddleware(config.teamSecret);
export const playerAuth = authMiddleware(config.playerSecret);