import TeamService from '../../services/teamService';
import { Request, Response } from 'express';
import { Team } from '../../models/team';

export async function create(req: Request, res: Response){
    function onSuccess(){
        res.json({
            message: '팀이 생성되었습니다.'
        });
    }

    function onExist(){
        res.status(400).json({
            message: '같은 팀이 이미 있습니다.'
        });
    }

    function onError(err: Error){
        res.status(500).json({
            message: err.message
        });
    }

    try{
        const newTeam: Team = req.body;
        const team = await TeamService.read(newTeam.teamId);
        if(team)
            return onExist();
        newTeam.ownerId = req.app.get('info')._id;
        await TeamService.create(newTeam);
        return onSuccess();
    }
    catch(err){
        return onError(err)
    }
}

export async function read(req: Request, res: Response){
    function onSuccess(team: Team){
        res.json({
            team
        });
    }

    function onError(err: Error){
        res.status(500).json({
            message: err.message
        });
    }

    try{
        const teamId = req.params.teamId;
        const team: Team = await TeamService.read(teamId);
        return onSuccess(team);
    }
    catch(err){
        return onError(err);
    }
}

export async function readByOwnerId(req: Request, res: Response){
    function onSuccess(teams: Team[]){
        res.json({
            teams
        });
    }

    function onError(err: Error){
        res.status(500).json({
           message: err.message 
        });
    }

    try{
        const ownerId = req.app.get('info')._id;
        const teams: Team[] = await TeamService.readByOwnerId(ownerId);
        return onSuccess(teams);
    }
    catch(err){
        return onError(err);
    }
}

