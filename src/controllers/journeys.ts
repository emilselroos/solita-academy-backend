import { ValidationError } from 'sequelize';
import { Request, Response } from 'express';
import {
	Journey,
	JourneyAttributes,
} from '../database/models/journey.model.js';
import { Station } from '../database/models/station.model.js';

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
		// @TODO: replace hard limit with backend pagination
		const journeys: JourneyAttributes[] | null | [] =
			(await Journey?.findAll({
				limit: 500,
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
			})) ?? [];
		return res.status(200).json({
			data: journeys,
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
		console.log(journey);
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
						"Something went wrong, and we don't know what exactly.",
				},
			});
		}
	}
};

export default { getCount, getJourneys, getJourney, createJourney };
