import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import connection from './database/connection.js';

const app: Express = express();
const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send(`OK!`);
});

const start = async () => {
    try {
        await connection.authenticate();
        await connection.sync();
        console.log(`[City Bike Server] Database connection has been established successfully.`);
        app.listen(PORT, async () => {
            console.log(`[City Bike Server] Backend running at localhost:${PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

start();
