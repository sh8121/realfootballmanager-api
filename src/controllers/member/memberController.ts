import * as jwt from 'jsonwebtoken';
import { Member } from '../../models/member';
import MemberService from '../../services/memberService';
import crypto from '../../utils/crypto';
import { Request, Response } from 'express';

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
        let member = await MemberService.read(newMember.memberId);
        if(member)
            return onExist();
        newMember.password = crypto.encrypt(newMember.password);
        await MemberService.create(newMember);
        return onSuccess();
    }
    catch(error){
        return onError(error);
    }
}

export async function login(req: Request, res: Response){
    const {memberId, password} = req.body;
    const secret = req.app.get('jwt-secret');

    function sign(member: Member): Promise<string>{
        return new Promise((resolve, reject) => {
            jwt.sign(
                {
                    _id: member.memberId,
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
        let member = await MemberService.read(memberId);
        if(!member)
            return onNonExist();
        if(member.password !== crypto.encrypt(password))
            return onNonExist();
        let token = await sign(member);
        return onSuccess(member, token);    
    }
    catch(error){
        return onError(error);
    }
}
