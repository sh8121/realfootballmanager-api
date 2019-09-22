import { Match, PlayerInMatch } from '../models/match';
import connection from '../utils/dbConnection';

export default class MatchService {
    static async createInTransaction(match: Match, playerInMatches: PlayerInMatch[]){
        try{
            await connection.beginTransaction(async err => {
                if(err)
                    throw err;
            });
            const result: any = await MatchService.create(match);
            for(let playerInMatch of playerInMatches){
                playerInMatch.matchId = result.insertId as number;
                await MatchService.createPlayerInMatch(playerInMatch);
            }
            await connection.commit(async err => {
                if(err)
                    throw err;
            })
        }
        catch(err){
            await connection.rollback(async err => {
                if(err)
                    throw err;
            });
            throw err;
        }
    }

    static create(match: Match){
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO matches(teamId, competitorName, teamScore, competitorScore, 
                goal, assist, shot, shotOnTarget, shutOff, clear, blocks, save, 
                foul, offside, yellowCard, redCard,
                cornerKick, freeKick, panaltyKick, passMiss, controlMiss)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            connection.query(sql, 
                [match.teamId, match.competitorName, match.teamScore, match.competitorScore,
                match.goal, match.assist, match.shot, match.shotOnTarget, match.shutOff, match.clear, match.block, match.save,
                match.foul, match.offside, match.yellowCard, match.redCard,
                match.cornerKick, match.freeKick, match.panaltyKick, match.passMiss, match.controlMiss],
                (err, result) => {
                    if(err)
                        return reject(err);
                    return resolve(result);
                }
            );
        });
    }

    static createPlayerInMatch(playerInMatch: PlayerInMatch){
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO playerInMatch(matchId, teamId, playerId,
                goal, assist, shot, shotOnTarget, shutOff, clear, blocks, save, 
                foul, offside, yellowCard, redCard,
                cornerKick, freeKick, panaltyKick, passMiss, controlMiss) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            connection.query(sql, 
                [playerInMatch.matchId, playerInMatch.teamId, playerInMatch.playerId,
                playerInMatch.goal, playerInMatch.assist, playerInMatch.shot, playerInMatch.shotOnTarget, 
                playerInMatch.shutOff, playerInMatch.clear, playerInMatch.block, playerInMatch.save,
                playerInMatch.foul, playerInMatch.offside, playerInMatch.yellowCard, playerInMatch.redCard,
                playerInMatch.cornerKick, playerInMatch.freeKick, playerInMatch.panaltyKick, playerInMatch.passMiss, 
                playerInMatch.controlMiss],
                (err, result) => {
                    if(err)
                        return reject(err);
                    return resolve(result);
                });
            
        });
    }

    static readByTeam(teamId: string): Promise<Match[]>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM matches WHERE teamId=?';
            connection.query(sql, [teamId], (err, result: Match[]) => {
                if(err)
                    return reject(err);
                return resolve(result);
            });
        });
    }
}