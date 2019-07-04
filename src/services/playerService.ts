import connection from '../utils/dbConnection';
import { Player } from '../models/player';

export default class PlayerService{
    static create(player: Player){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO player(playerId, password, name, gender, bornYear) VALUES(?, ?, ?, ?, ?)';
            connection.query(sql, [player.playerId, player.password, player.name, player.gender, player.bornYear], (err, result) => {
                if(err)
                    return reject(err);
                return resolve(result);
            });
        });
    }

    static read(playerId: string): Promise<Player>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM player where playerId=?';
            connection.query(sql, [playerId], (err, result: Player[]) => {
                if(err)
                    return reject(err);
                if(!result || result.length === 0)
                    return resolve(null);                
                return resolve(result[0]);
            });
        });
    }
}