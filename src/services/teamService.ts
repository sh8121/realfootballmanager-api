import connection from '../utils/dbConnection';
import { Team } from '../models/team';
import { PlayerTeamRelation, PlayerTeamRelationEx } from '../models/relation';

export default class TeamService {
    static create(team: Team){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO team(teamId, password, name) VALUES(?, ?, ?)';
            connection.query(sql, [team.teamId, team.password, team.name], (err, result) => {
                if(err)
                    return reject(err);
                return resolve(result);
            });
        });
    }

    static read(teamId: string): Promise<Team>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM team where teamId=?';
            connection.query(sql, [teamId], (err, result: Team[]) => {
                if(err)
                    return reject(err);
                if(!result || result.length === 0)
                    return resolve(null);                
                return resolve(result[0]);
            });
        });
    }

    static createPlayer(playerTeamRelation: PlayerTeamRelation){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO playerTeamRelation(teamId, playerId, number, position) VALUES(?, ?, ?, ?)';
            connection.query(
                sql, 
                [playerTeamRelation.teamId, playerTeamRelation.playerId, playerTeamRelation.number, playerTeamRelation.position], 
                (err, result) => {
                    if(err)
                        return reject(err);
                    return resolve(result);
                }
            );
        });
    }

    static readPlayers(teamId: string): Promise<PlayerTeamRelationEx[]>{
        return new Promise((resolve, reject) => {
            const sql = `SELECT ptr.teamId as teamId, ptr.playerId as playerId, ptr.number as number, ptr.position as position, 
                p.name as name, p.gender as gender, p.bornYear as bornYear
                FROM playerTeamRelation as ptr 
                JOIN player as p
                ON ptr.playerId = p.playerId
                WHERE ptr.teamId=?`;
            connection.query(sql, [teamId], (err, result: PlayerTeamRelationEx[]) => {
                if(err)
                    return reject(err);
                if(!result || result.length === 0)
                    return resolve(null);                
                return resolve(result);
            });
        });
    }
}