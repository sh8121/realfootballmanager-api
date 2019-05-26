import * as crypto from 'crypto'
import config from '../config'

export interface ICryptoService{
    encrypt(str: string): string
}

let cryptoService: ICryptoService = {
    encrypt: (str) => {
        const encrypted = crypto.createHmac("sha1", config.secret)
            .update(str)
            .digest('base64');
        return encrypted;
    }
};

export default cryptoService