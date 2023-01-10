import { Request, Response, NextFunction } from 'express';
import connection from '../database/connection.js';
const { Journey } = connection.models;

interface Journey {
	JID: number,
	departure_time: number,
	return_time: number,
	departure_station_id: number,
	return_station_id: number,
	distance: number,
	duration: number
}

/* 
 * all journeys
*/
const getJourneys = async (request: Request, response: Response, next: NextFunction) => {
	// @TODO: replace hard limit with backend pagination
	let journeys: Journey[] = await Journey?.findAll({ limit: 500 });
	return response.status(200).json({
		data: journeys,
	});
}

/* 
 * single journey
*/
const getJourney = async (request: Request, response: Response, next: NextFunction) => {
	let id: String = request.params.id;
	let journey: Journey = await Journey?.findOne({
		where: {
			JID: id,
		}
	});
	return response.status(200).json({
		data: journey,
	});
}

export default { getJourneys, getJourney };
