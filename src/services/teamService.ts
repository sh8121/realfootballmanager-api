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
}