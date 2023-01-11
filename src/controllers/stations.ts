import { Request, Response, NextFunction } from 'express';
import connection from '../database/connection.js';
const { Station } = connection.models;

interface IStation {
	SID: number,
	station_number: number,
	name: string,
	address: string,
	city: string,
	capasity: number,
	x: number,
	y: number
}

/*
 * get all stations
*/
const getStations = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let stations: IStation[] | []= await Station?.findAll() || [];
		return res.status(200).json({
			data: stations,
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
 * get single station
*/
const getStation = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let id: string = req.params.id || '';
		let station: IStation = await Station?.findOne({
			where: {
				SID: id,
			}
		});
		return res.status(200).json({
			data: station,
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
 * create a new station
*/
const createStation = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let data = req.body;
		let newStation: IStation = await Station?.create(data);
		res.status(200).json({
			data: newStation,
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

export default { getStations, getStation, createStation };
