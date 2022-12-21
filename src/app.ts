import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import connection from './database/connection.js';

const app: Express = express();
const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send(`OK!`);
});

app.listen(PORT, async () => {
    console.log(`[City Bike Server] Backend running at localhost:${PORT}`);
    try {
        await connection.authenticate();
        console.log(`[City Bike Server] Database connection has been established successfully.`);
    } catch (error) {
        console.error(`[ERROR] Unable to connect to the database: `, error);
    }
});
