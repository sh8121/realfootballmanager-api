import { Request, Response } from 'express';
import { Player } from '../../models/player';
import PlayerService from '../../services/playerService';

export async function register(req: Request, res: Response){
    const newPlayer: Player = req.body;
    const teamId = req.params.teamId;
    newPlayer.teamId = teamId;
    
    function onSuccess(){
        res.json({
            message: '선수가 등록되었습니다.'
        });
    }

    function onError(err: Error){
        res.status(500).json({
            message: err.message
        });
    }

    function onBadRequest(msg: string){
        res.status(400).json({
            message: msg
        });
    }

    try{
        const players = await PlayerService.readByTeamId(newPlayer.teamId);
        for(let player of players){
            if(player.playerId === newPlayer.playerId){
                return onBadRequest('이미 등록된 선수입니다.');
            }
            if(player.number === newPlayer.number){
                return onBadRequest('이미 등록된 번호입니다.');
            }
        }
        await PlayerService.create(newPlayer);
        return onSuccess();
    }
    catch(err){
        return onError(err);
    }
}

export async function findByTeam(req: Request, res: Response){
    const { teamId } = req.params;
    
    function onSuccess(players: Player[]){
        res.json(players);
    }

    function onError(err: Error){
        res.status(500).json({
            message: err.message
        });
    }

    try{
        const players = await PlayerService.readByTeamId(teamId);
        return onSuccess(players);
    }
    catch(err){
        return onError(err);
    }
}