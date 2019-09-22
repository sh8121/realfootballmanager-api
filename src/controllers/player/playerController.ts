import { Request, Response } from 'express';
import { Player } from '../../models/player';
import { PlayerInMatch } from '../../models/match';
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
        const players = await PlayerService.readByTeam(newPlayer.teamId);
        for(let player of players){
            if(player.playerId === newPlayer.playerId){
                return onBadRequest('이미 등록된 선수입니다.');
            }
            if(player.number == newPlayer.number){
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

export async function edit(req: Request, res: Response){
    const editedPlayer: Player = req.body;
    editedPlayer.teamId = req.params.teamId;
    editedPlayer.playerId = req.params.playerId;

    try{
        const players = await PlayerService.readByTeam(editedPlayer.teamId);
        for(let player of players){
            if(player.playerId !== editedPlayer.playerId &&
                player.number == editedPlayer.number)
            {
                return onBadRequest('이미 등록된 번호입니다.');
            }
        }
        await PlayerService.update(editedPlayer);
        return onSuccess();
    }
    catch(err){
        return onError(err);
    }

    function onSuccess(){
        res.json({
            message: '선수가 편집되었습니다.'
        });
    }

    function onError(err: Error){
        res.status(500).json({
            message: err.message
        });
    }

    function onBadRequest(msg: string){
        res.status(404).json({
            message: msg
        });
    }
}

export async function deleteP(req: Request, res: Response){
    const teamId = req.params.teamId;
    const playerId = req.params.playerId;

    try{
        await PlayerService.delete(teamId, playerId);
        return onSuccess();
    }
    catch(err){
        return onError(err);
    }

    function onSuccess(){
        res.json({
            message: '선수가 삭제되었습니다.'
        });
    }

    function onError(err: Error){
        res.status(500).json({
            message: err.message
        });
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
        const players = await PlayerService.readByTeam(teamId);
        return onSuccess(players);
    }
    catch(err){
        return onError(err);
    }
}

export async function findMatchByPlayer(req: Request, res: Response){
    try{
        const { teamId, playerId } = req.params;
        const matches = await PlayerService.readMatchByPlayer(teamId, playerId);
        return onSuccess(matches);
    }
    catch(err){
        return onError(err);
    }

    function onSuccess(matches: PlayerInMatch[]){
        res.json(matches);
    }

    function onError(err: Error){
        res.status(500).json({
            message: err.message
        });
    }
}