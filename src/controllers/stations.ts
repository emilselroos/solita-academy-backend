import { ValidationError } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import {
	Station,
	StationAttributes,
} from '../database/models/station.model.js';
import { Journey } from '../database/models/journey.model.js';

/*
 * get all stations
 */
const getStations = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const stations: StationAttributes[] | null | [] =
			(await Station?.findAll()) ?? [];
		return res.status(200).json({
			data: stations,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			data: null,
			error: {
				message:
					"Something went wrong, and we don't know what exactly.",
			},
		});
	}
};

/*
 * get single station
 */
const getStation = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id: string = req.params.id ?? '';
		const station: StationAttributes | null =
			(await Station?.findOne({
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
					},
				],
			})) ?? null;
		return res.status(200).json({
			data: station,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			data: null,
			error: {
				message:
					"Something went wrong, and we don't know what exactly.",
			},
		});
	}
};

/*
 * create a new station
 */
const createStation = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const data = req.body;
		const newStation: StationAttributes = await Station?.create(data);
		res.status(200).json({
			data: newStation,
		});
	} catch (error) {
		if (error instanceof ValidationError) {
			res.status(500).json({
				data: null,
				error: {
					message: error?.errors[0]?.message,
				},
			});
		} else {
			console.error(error);
			res.status(500).json({
				data: null,
				error: {
					message:
						"Something went wrong, and we don't know what exactly.",
				},
			});
		}
	}
};

export default { getStations, getStation, createStation };
