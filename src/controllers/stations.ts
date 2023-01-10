import { Request, Response, NextFunction } from 'express';
import connection from '../database/connection.js';
const { Station } = connection.models;

interface Station {
	SID: Number,
	name: String,
	address: String,
	city: String,
	capasity: Number,
	x: Number,
	y: Number
}

/* 
 * all stations
*/
const getStations = async (request: Request, response: Response, next: NextFunction) => {
	let stations: Station[] = await Station?.findAll();
	return response.status(200).json({
		data: stations,
	});
}

/* 
 * single station
*/
const getStation = async (request: Request, response: Response, next: NextFunction) => {
	let id: string = request.params.id || '';
	let station: Station = await Station?.findOne({
		where: {
			SID: id,
		}
	});
	return response.status(200).json({
		data: station,
	});
}

export default { getStations, getStation };
