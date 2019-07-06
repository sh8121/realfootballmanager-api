import * as express from 'express';
import * as bearerToken from 'express-bearer-token';
import * as cors from 'cors'
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import config from './config';
import api from './controllers';

const app = express();
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(bearerToken())
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use(cors())

app.use('/api', api);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});