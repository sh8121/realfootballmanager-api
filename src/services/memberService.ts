import connection from '../utils/dbConnection';
import { Member } from '../models/member';

export default class MemberService{
    static create(member: Member){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO member(memberId, password, name, gender, bornYear) VALUES(?, ?, ?, ?, ?)';
            connection.query(sql, [member.memberId, member.password, member.name, member.gender, member.bornYear], (err, result) => {
                if(err)
                    return reject(err);
                return resolve(result);
            });
        });
    }

    static read(memberId: string): Promise<Member>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM member where memberId=?';
            connection.query(sql, [memberId], (err, result: Member[]) => {
                if(err)
                    return reject(err);
                if(!result || result.length === 0)
                    return resolve(null);                
                return resolve(result[0]);
            });
        });
    }

    static update(member: Member){
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE INTO member(password, name, gender, bornYear) VALUES(?, ?, ?, ?) where memberId=?';
            connection.query(sql, [member.password, member.name, member.gender, member.bornYear, member.memberId], (err, result) => {
                if(err)
                    return reject(err);
                return resolve(result);
            });
        });
    }
}