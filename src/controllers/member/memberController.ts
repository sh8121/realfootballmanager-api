import * as jwt from 'jsonwebtoken';
import MemberService, {Member} from '../../models/member';
import { Request, Response } from 'express';

interface LoginRequest{
    id: string,
    password: string
}

export async function register(req: Request, res: Response){
    const newMember: Member = req.body;

    function onSuccess(){
        res.json({
            message: 'Registered Successfully'
        });
    }

    function onExist(){
        res.status(400).json({
            message: 'Member already exist'
        });
    }

    function onError(error: Error){
        res.status(500).json({
            message: error.message
        });
    }

    try{
        let member = await MemberService.findOneById(newMember.id);
        if(member)
            return onExist();
        await MemberService.create(newMember);
        return onSuccess();
    }
    catch(error){
        return onError(error);
    }
}

export async function login(req: Request, res: Response){
    const {id, password}: LoginRequest = req.body;
    const secret = req.app.get('jwt-secret');

    function sign(member: Member): Promise<string>{
        return new Promise((resolve, reject) => {
            jwt.sign(
                {
                    _id: member.id,
                    name: member.name
                },
                secret,
                {
                    expiresIn: '1d',
                    issuer: 'sboo.kr',
                    subject: 'memberInfo'
                },
                (err, token) => {
                    if(err)
                        return reject(err);
                    return resolve(token);
                }
            );
        });
    }

    function onSuccess(member: Member, token: string){
        res.json({
            message: 'Logged In Successfully',
            member: {
                name: member.name,
                token
            }
        });
    }

    function onNonExist(){
        res.status(400).json({
            message: 'Member doesn\'t exist'
        });
    }

    function onError(error: Error){
        res.status(500).json({
            message: error.message
        });
    }

    try{
        let member = await MemberService.validateOne(id, password);
        if(!member)
            return onNonExist();
        let token = await sign(member);
        return onSuccess(member, token);    
    }
    catch(error){
        return onError(error);
    }
}
