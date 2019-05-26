import connection from '../utils/dbConnection';
import crypto from '../utils/crypto'

export enum Gender{
    MALE,
    FEMALE
}

export interface Member{
    name: string;
    gender: Gender;
    age: number;
    id: string;
    password: string;
}

export default class MemberService{
    static create(member: Member){
        return new Promise((resolve, reject) => {
            const encrypted = crypto.encrypt(member.password);
            const sql = 'INSERT INTO member(name, gender, age, id, password) VALUES(?, ?, ?, ?, ?)';
            connection.query(sql, [member.name, member.gender, member.age, member.id, encrypted], (err, result) => {
                if(err)
                    return reject(err);
                return resolve(result);
            });
        });
    }

    static findOneById(id: string, password: string){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM member where id=?';
            connection.query(sql, [id], (err, result) => {
                if(err)
                    return reject(err);
                if(!result || result.length === 0)
                    return resolve(null);
                const member = <Member>result[0];
                if(member.password !== crypto.encrypt(password))
                    return resolve(null);
                return resolve(member);
            });
        });
    }

    static update(member: Member){
        return new Promise((resolve, reject) => {
            const encrypted = crypto.encrypt(member.password);
            const sql = 'UPDATE INTO member(name, gender, age, id, password) VALUES(?, ?, ?, ?, ?)';
            connection.query(sql, [member.name, member.gender, member.age, member.id, encrypted], (err, result) => {
                if(err)
                    return reject(err);
                return resolve(result);
            });
        });
    }
}