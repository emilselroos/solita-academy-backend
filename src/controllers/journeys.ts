import { ValidationError } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import { Journey, JourneyAttributes } from '../database/models/journey.model.js';
import { Station } from '../database/models/station.model.js';

/*
 * get all journeys
*/
const getJourneys = async (req: Request, res: Response, next: NextFunction) => {
	try {

		// @TODO: replace hard limit with backend pagination
		let journeys: JourneyAttributes[] | null | [] = await Journey?.findAll({
			limit: 500,
			include: [
				{
					as: 'departure_station',
					model: Station,
				},
				{
					as: 'return_station',
					model: Station,
				}
			]
		}) ?? [];
		return res.status(200).json({
			data: journeys,
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
 * get single journey
*/
const getJourney = async (req: Request, res: Response, next: NextFunction) => {
	try {

		let id: string | undefined = req.params.id;
		let journey: JourneyAttributes | null = await Journey?.findOne({
			where: {
				JID: id,
			},
			include: [
				{
					as: 'departure_station',
					model: Station,
				},
				{
					as: 'return_station',
					model: Station,
				}
			]
		}) ?? null;
		return res.status(200).json({
			data: journey,
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
 * create a new journey
*/
const createJourney = async (req: Request, res: Response, next: NextFunction) => {
	try {

		let data = req.body;
		let newJourney: JourneyAttributes = await Journey?.create(data);
		res.status(200).json({
			data: newJourney,
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

export default { getJourneys, getJourney, createJourney };
