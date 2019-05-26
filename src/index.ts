import * as express from 'express'
import * as bearerToken from 'express-bearer-token'
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import config from './config';

const app = express()
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000

app.use(bearerToken())
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(morgan('dev'))
    .set('jwt-secret', config.secret)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})