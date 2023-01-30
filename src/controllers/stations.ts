import sequelize, { ValidationError } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import {
	Station,
	StationAttributes,
} from '../database/models/station.model.js';
import { Journey } from '../database/models/journey.model.js';
import connection from '../database/connection.js';

/*
 * get stations count
 */
const getCount = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const stationsCount: number = await Station?.count();
		return res.status(200).json({
			data: {
				count: stationsCount,
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
					station_number: id,
				},
				include: [
					{
						as: 'departure_journeys',
						model: Journey,
						limit: 5,
					},
					{
						as: 'return_journeys',
						model: Journey,
						limit: 5,
					},
				],
			})) ?? null;

		// Total count of incoming and outgoing journeys
		const departureJourneysCount = await Journey?.count({
			where: {
				departure_station_id: station?.station_number,
			},
		});
		const returnJourneysCount = await Journey?.count({
			where: {
				return_station_id: station?.station_number,
			},
		});

		// Average distance of incoming and outgoing journeys
		const outgoingAverageDistance = await connection.query(`
			SELECT departure_station_id, AVG(distance) AS avg_distance
			FROM journeys
			WHERE departure_station_id = ${station?.station_number}
			GROUP BY departure_station_id
		`);
		const incomingAverageDistance = await connection.query(`
			SELECT return_station_id, AVG(distance) AS avg_distance
			FROM journeys
			WHERE return_station_id = ${station?.station_number}
			GROUP BY return_station_id
		`);

		// Top 5 most popular destinations and origins to and from active station
		const topDestinations = await connection.query(`
			SELECT return_station_id, COUNT(*) AS journey_count, stations.name
			FROM journeys
			JOIN stations ON journeys.return_station_id = stations.station_number
			WHERE departure_station_id = ${station?.station_number}
			GROUP BY stations.name, return_station_id
			ORDER BY journey_count DESC
			LIMIT 5
		`);
		const topOrigins = await connection.query(`
			SELECT departure_station_id, COUNT(*) AS journey_count, stations.name
			FROM journeys
			JOIN stations ON journeys.departure_station_id = stations.station_number
			WHERE return_station_id = ${station?.station_number}
			GROUP BY stations.name, departure_station_id
			ORDER BY journey_count DESC
			LIMIT 5
		`);

		return res.status(200).json({
			data: {
				station: station,
				stats: {
					departureJourneysCount,
					returnJourneysCount,
					topDestinations: topDestinations[0],
					topOrigins: topOrigins[0],
					outgoingAverageDistance: Math.round(
						outgoingAverageDistance[0][0].avg_distance,
					),
					incomingAverageDistance: Math.round(
						incomingAverageDistance[0][0].avg_distance,
					),
				},
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

export default { getCount, getStations, getStation, createStation };
