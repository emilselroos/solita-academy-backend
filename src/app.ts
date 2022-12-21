import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send(`OK!`);
});

app.listen(PORT, () => {
    console.log(`[City Bike App] Backend running at localhost:${PORT}`);
});
