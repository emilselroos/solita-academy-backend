import { Request, Response, NextFunction } from 'express';
import connection from '../database/connection.js';
const { Journey } = connection.models;

interface IJourney {
	JID: number,
	departure_time: number,
	return_time: number,
	departure_station_id: number,
	return_station_id: number,
	distance: number,
	duration: number
}

/*
 * get all journeys
*/
const getJourneys = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// @TODO: replace hard limit with backend pagination
		let journeys: IJourney[] = await Journey?.findAll({ limit: 500 });
		return res.status(200).json({
			data: journeys,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			data: null,
			error: {
				message: "Something went wrong."
			}
		});
	}
}

/*
 * get single journey
*/
const getJourney = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let id: string = req.params.id;
		let journey: IJourney = await Journey?.findOne({
			where: {
				JID: id,
			}
		});
		return res.status(200).json({
			data: journey,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			data: null,
			error: {
				message: "Something went wrong."
			}
		});
	}
}

/*
 * create a new journey
*/
const createJourney = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let data = req.body;
		let newJourney: IJourney = await Journey?.create(data);
		res.status(200).json({
			data: newJourney,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			data: null,
			error: {
				message: "Something went wrong."
			}
		});
	}
}

export default { getJourneys, getJourney, createJourney };
