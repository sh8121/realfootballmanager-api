import connection from '../utils/dbConnection';
import { Player } from '../models/player';
import { PlayerInMatch } from '../models/match';

export default class PlayerService{
    static create(player: Player){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO player(teamId, playerId, name, number, position) VALUES(?, ?, ?, ?, ?)';
            connection.query(sql, [player.teamId, player.playerId, player.name, player.number, player.position], (err, result) => {
                if(err)
                    return reject(err);
                return resolve(result);
            });
        });
    }

    static update(player: Player){
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE player SET name=?, number=?, position=? where teamId=? AND playerId=?';
            connection.query(sql, [player.name, player.number, player.position, player.teamId, player.playerId], (err, result) => {
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    }

    static delete(teamId: string, playerId: string){
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM player WHERE teamId=? AND playerId=?';
            connection.query(sql, [teamId, playerId], (err, result) => {
                if(err)
                    return reject(err);
                return resolve(result);
            });
        });
    }

    static read(teamId: string, playerId: string): Promise<Player>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM player where teamId=? AND playerId=?';
            connection.query(sql, [teamId, playerId], (err, result: Player[]) => {
                if(err)
                    return reject(err);
                if(!result || result.length === 0)
                    return resolve(null);                
                return resolve(result[0]);
            });
        });
    }

    static readByTeam(teamId: string): Promise<Player[]>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * from player where teamId=?';
            connection.query(sql, [teamId], (err, result) => {
                if(err)
                    return reject(err);
                return resolve(result);
            });
        });
    }

    static readMatchByPlayer(teamId: string, playerId: string): Promise<PlayerInMatch[]>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM playerInMatch WHERE teamId=? AND playerId=?';
            connection.query(sql, [teamId, playerId], (err, result: PlayerInMatch[]) => {
                if(err)
                    return reject(err);
                return resolve(result);
            });
        });
    }
}