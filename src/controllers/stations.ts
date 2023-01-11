import { ValidationError } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import connection from '../database/connection.js';
const { Station, Journey } = connection.models;

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
				message: "Something went wrong, and we don't know what exactly."
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
			},
			include: [
				{
					as: 'departure_journeys',
					model: Journey,
					limit: 10,
				},
				{
					as: 'return_journeys',
					model: Journey,
					limit: 10,
				}
			]
		});
		return res.status(200).json({
			data: station,
		});

	} catch (error) {

		console.error(error);
		res.status(500).json({
			data: null,
			error: {
				message: "Something went wrong, and we don't know what exactly."
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

		if (error instanceof ValidationError) {
			res.status(500).json({
				data: null,
				error: {
					message: error?.errors[0]?.message
				}
			});
		} else {
			console.error(error);
			res.status(500).json({
				data: null,
				error: {
					message: "Something went wrong, and we don't know what exactly."
				}
			});
		}

	}
}

export default { getStations, getStation, createStation };
