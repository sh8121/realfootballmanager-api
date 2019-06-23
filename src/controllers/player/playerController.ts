import * as jwt from 'jsonwebtoken';
import crypto from '../../utils/crypto';
import { Request, Response } from 'express';
import { Player } from '../../models/player';
import PlayerService from '../../services/playerService';

export async function register(req: Request, res: Response){
    const newPlayer: Player = req.body;

    function onSuccess(){
        res.json({
            message: '가입되었습니다.'
        });
    }

    function onExist(){
        res.status(400).json({
            message: '선수가 이미 존재합니다.'
        });
    }

    function onError(error: Error){
        res.status(500).json({
            message: error.message
        });
    }

    try{
        
        let player = await PlayerService.read(newPlayer.playerId);
        if(player)
            return onExist();
        newPlayer.password = crypto.encrypt(newPlayer.password);
        await PlayerService.create(newPlayer);
        return onSuccess();
    }
    catch(error){
        return onError(error);
    }
}

export async function login(req: Request, res: Response){
    const {playerId, password} = req.body;
    const secret = req.app.get('player-secret');

    function sign(player: Player): Promise<string>{
        return new Promise((resolve, reject) => {
            jwt.sign(
                {
                    _id: player.playerId,
                    name: player.name
                },
                secret,
                {
                    expiresIn: '1d',
                    issuer: 'sboo.kr',
                    subject: 'playerInfo'
                },
                (err, token) => {
                    if(err)
                        return reject(err);
                    return resolve(token);
                }
            );
        });
    }

    function onSuccess(player: Player, token: string){
        res.json({
            message: '로그인 되었습니다.',
            player: {
                name: player.name,
                token
            }
        });
    }

    function onNonExist(){
        res.status(400).json({
            message: '선수가 존재하지 않습니다.'
        });
    }

    function onError(error: Error){
        res.status(500).json({
            message: error.message
        });
    }

    try{
        let player = await PlayerService.read(playerId);
        if(!player)
            return onNonExist();
        if(player.password !== crypto.encrypt(password))
            return onNonExist();
        let token = await sign(player);
        return onSuccess(player, token);    
    }
    catch(error){
        return onError(error);
    }
}
