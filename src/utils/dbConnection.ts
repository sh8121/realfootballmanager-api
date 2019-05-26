import * as mysql from 'mysql';
import config from '../config';

let connection: mysql.Connection;

function getConnection(): mysql.Connection{
    if(!connection){
        connection = mysql.createConnection({
            host: config.mysqlConfig.host,
            user: config.mysqlConfig.user,
            password: config.mysqlConfig.password,
            database: config.mysqlConfig.database
        });

        connection.connect((err) => {
            if(err)
                throw err;
            console.log('mysql connected.');
        });
    }
    return connection;
}

export default getConnection();