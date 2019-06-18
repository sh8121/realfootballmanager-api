import connection from '../utils/dbConnection';
import { Team } from '../models/team';

export default class TeamService {
    static create(team: Team){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO team(teamId, name, ownerId) VALUES(?, ?, ?)';
            connection.query(sql, [team.teamId, team.name, team.ownerId], (err, result) => {
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
        })
    }

    static readByOwnerId(ownerId: string): Promise<Team[]>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM team where ownerId=?';
            connection.query(sql, [ownerId], (err, result: Team[]) => {
                if(err)
                    return reject(err);
                if(!result || result.length === 0)
                    return resolve(null);                
                return resolve(result);
            });
        });
    }

    static update(team: Team){
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE INTO team(name) VALUES(?) where teamId=?';
            connection.query(sql, [team.name, team.teamId], (err, result) => {
                if(err)
                    return reject(err);
                return resolve(result);
            });
        });
    }    
}