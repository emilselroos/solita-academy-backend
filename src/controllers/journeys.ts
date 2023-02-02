import { ValidationError } from 'sequelize';
import { Request, Response } from 'express';
import {
	Journey,
	JourneyAttributes,
} from '../database/models/journey.model.js';
import { Station } from '../database/models/station.model.js';

interface ResultsAndCount {
	count?: number;
	rows?: JourneyAttributes[];
}

/*
 * get journeys count
 */
const getCount = async (req: Request, res: Response) => {
	try {
		const journeysCount: number = await Journey?.count();
		return res.status(200).json({
			data: {
				count: journeysCount,
			},
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
 * get all journeys
 */
const getJourneys = async (req: Request, res: Response) => {
	try {
		// console.log(req.query);
		const pageNumber: number = parseInt(req.query.page as string)
			? parseInt(req.query.page as string)
			: 0;
		const pageSize: number = parseInt(req.query.limit as string)
			? parseInt(req.query.limit as string)
			: 20;
		const offset: number = pageSize * pageNumber;

		const journeys: ResultsAndCount | null =
			(await Journey?.findAndCountAll({
				limit: pageSize,
				offset: offset,
				include: [
					{
						as: 'departure_station',
						model: Station,
					},
					{
						as: 'return_station',
						model: Station,
					},
				],
			})) ?? null;

		return res.status(200).json({
			data: {
				journeys: journeys.rows,
				totalCount: journeys.count,
			},
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
 * get single journey
 */
const getJourney = async (req: Request, res: Response) => {
	try {
		const id: string | undefined = req.params.id;
		const journey: JourneyAttributes | null =
			(await Journey?.findOne({
				where: {
					JID: id,
				},
				include: ['departure_station', 'return_station'],
			})) ?? null;
		return res.status(200).json({
			data: journey,
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
 * create a new journey
 */
const createJourney = async (req: Request, res: Response) => {
	try {
		const data = req.body;
		const newJourney: JourneyAttributes = await Journey?.create(data);
		res.status(200).json({
			data: newJourney,
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
						"Something went wrong, and we don't know what exactly. Maybe there's no station with such station number?",
				},
			});
		}
	}
};

export default { getCount, getJourneys, getJourney, createJourney };
