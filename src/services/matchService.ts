import { Match } from '../models/match';
import connection from '../utils/dbConnection';

export default class MatchService {
    static create(match: Match){
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO match(teamId, competitorName, teamScore, competitorScore, 
                goal, assist, shot, shotOnTarget, shutOff, clear, block, save, 
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
}