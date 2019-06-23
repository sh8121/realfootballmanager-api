import connection from '../utils/dbConnection';
import { Team } from '../models/team';

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

    // static createPlayer(teamId, playerId, number, position){
    //     return new Promise((resolve, reject) => {
    //         const sql = 'INSERT INTO playerTeamRelation(teamId, playerId, number, position) VALUES(?, ?, ?, ?)';
    //         connection.query(sql, [teamId, playerId, number, position], (err, result) => {
    //             if(err)
    //                 return reject(err);
    //             return resolve(result);
    //         });
    //     });
    // }

    // static readPlayers(teamId: string): Promise<Player[]>{
    //     return new Promise((resolve, reject) => {
    //         const sql = `SELECT ptr.playerId as playerId, m.name as name, ptr.number as number, ptr.position as position 
    //             FROM playerTeamRelation as ptr 
    //             JOIN member as m
    //             ON ptr.playerId = m.memberId
    //             WHERE ptr.teamId=?`;
    //         connection.query(sql, [teamId], (err, result: Player[]) => {
    //             if(err)
    //                 return reject(err);
    //             if(!result || result.length === 0)
    //                 return resolve(null);                
    //             return resolve(result);
    //         });
    //     });
    // }
}