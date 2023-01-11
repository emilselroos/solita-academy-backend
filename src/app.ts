import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

import connection from './database/connection.js';
import { stationsRouter, journeysRouter } from './routes/index.js';

const app: Express = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(express.json());

app.get('/test', (req: Request, res: Response) => {
	res.status(200).send(`OK!`);
});

app.use('/stations', stationsRouter);
app.use('/journeys', journeysRouter);

const start = async () => {
	try {
		await connection.authenticate().catch((error) => {
			console.log(`[City Bike Server] Sequelize Authentication Error: `, error);
		});
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
