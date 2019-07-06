import * as jwt from 'jsonwebtoken';
import crypto from '../../utils/crypto';
import { Request, Response } from 'express';
import { Team } from '../../models/team';
import TeamService from '../../services/teamService';
import { PlayerTeamRelation, PlayerTeamRelationEx } from '../../models/relation';
import config from '../../config';

export async function register(req: Request, res: Response){
    const newTeam: Team = req.body;

    function onSuccess(){
        res.json({
            message: '가입되었습니다.'
        });
    }

    function onExist(){
        res.status(400).json({
            message: '팀이 이미 존재합니다.'
        });
    }

    function onError(error: Error){
        res.status(500).json({
            message: error.message
        });
    }

    try{
        let team = await TeamService.read(newTeam.teamId);
        if(team)
            return onExist();
        newTeam.password = crypto.encrypt(newTeam.password);
        await TeamService.create(newTeam);
        return onSuccess();
    }
    catch(error){
        return onError(error);
    }
}

export async function login(req: Request, res: Response){
    const {teamId, password} = req.body;
    const secret = config.teamSecret;

    function sign(team: Team): Promise<string>{
        return new Promise((resolve, reject) => {
            jwt.sign(
                {
                    _id: team.teamId,
                    name: team.name
                },
                secret,
                {
                    expiresIn: '1d',
                    issuer: 'sboo.kr',
                    subject: 'teamInfo'
                },
                (err, token) => {
                    if(err)
                        return reject(err);
                    return resolve(token);
                }
            );
        });
    }

    function onSuccess(team: Team, token: string){
        res.json({
            message: '로그인 되었습니다.',
            team: {
                teamId: team.teamId,
                name: team.name,
                token
            }
        });
    }

    function onNonExist(){
        res.status(400).json({
            message: '팀이 존재하지 않습니다.'
        });
    }

    function onError(error: Error){
        res.status(500).json({
            message: error.message
        });
    }

    try{
        let team = await TeamService.read(teamId);
        if(!team)
            return onNonExist();
        if(team.password !== crypto.encrypt(password))
            return onNonExist();
        let token = await sign(team);
        return onSuccess(team, token);    
    }
    catch(error){
        return onError(error);
    }
}

export async function registerPlayer(req: Request, res: Response){
    const playerTeamRelation: PlayerTeamRelation = req.body;
    const teamId = req.params.teamId;
    playerTeamRelation.teamId = teamId;
    
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
        const playerTeamRelationExes = await TeamService.readPlayers(playerTeamRelation.teamId);
        for(let playerTeamRelationEx of playerTeamRelationExes){
            if(playerTeamRelationEx.playerId === playerTeamRelation.playerId){
                return onBadRequest('이미 등록된 선수입니다.');
            }
            if(playerTeamRelationEx.number === playerTeamRelation.number){
                return onBadRequest('이미 등록된 번호입니다.');
            }
        }
        await TeamService.createPlayer(playerTeamRelation);
        return onSuccess();
    }
    catch(err){
        return onError(err);
    }
}

export async function findPlayers(req: Request, res: Response){
    const { teamId } = req.params;
    
    function onSuccess(players: PlayerTeamRelationEx[]){
        res.json(players);
    }

    function onError(err: Error){
        res.status(500).json({
            message: err.message
        });
    }

    try{
        const players = await TeamService.readPlayers(teamId);
        return onSuccess(players);
    }
    catch(err){
        return onError(err);
    }
}