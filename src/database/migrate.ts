import * as fs from 'fs';
import _ from 'lodash';
import csv from 'csv-parser';
import connection from './connection.js';

const { Station, Journey } = connection.models;

type StationRecord = {
	fid: number;
	id: number;
	nimi: string;
	namn: string;
	name: string;
	osoite: string;
	address: string;
	kaupunki: string;
	stad: string;
	operaattori: string;
	kapasiteetti: number;
	x: number;
	y: number;
};

type JourneyRecord = {
	departure_time: Date;
	return_time: Date;
	departure_station_id: number;
	departure_station_name: string;
	return_station_id: number;
	return_station_name: string;
	distance: number; // in meters
	duration: number; // in seconds
};

/*
 * fetch all stations from csv
 */
const fetchStations = async () => {
	const headers: Array<string> = [
		'fid',
		'id',
		'nimi',
		'namn',
		'name',
		'osoite',
		'address',
		'kaupunki',
		'stad',
		'operaattori',
		'kapasiteetti',
		'x',
		'y',
	];
	const records: StationRecord[] = [];
	let newRecords = 0;

	console.log(`[Migration] Migrating stations data...`);

	await new Promise((resolve, reject) => {
		fs.createReadStream('src/data/stations.csv')
			.pipe(
				csv({
					skipLines: 1,
					headers: headers,
				}),
			)
			.on('data', (data: StationRecord) => records.push(data))
			.on('end', () => {
				records.forEach(async (row: StationRecord, key: number) => {
					const station = await Station?.findOne({
						where: {
							SID: row.id,
						},
					});

					if (!station) {
						newRecords = newRecords + 1;
						await Station?.build({
							station_number: row.id,
							name: row.name,
							address: row.osoite,
							city: row.kaupunki,
							capasity: row.kapasiteetti,
							x: row.x,
							y: row.y,
						})
							.save()
							.catch((error) => {
								console.log(
									`[Migration] Error when migrating stations: `,
									error,
								);
							});
					}

					// On last row, let's print out statistics.
					if (Object.is(records.length - 1, key)) {
						console.log(
							`[Migration] ${records.length} stations found.`,
						);
						console.log(
							`[Migration] ${newRecords} new stations added.`,
						);
						resolve('done');
					}
				});
			})
			.on('error', (error: any) => (console.error(error), reject(error)));
	});

	console.log(`[Migration] Migration of stations done!`);
};

/*
 * fetch all journeys from csv
 */
const fetchJourneys = async () => {
	const headers: Array<string> = [
		'departure_time',
		'return_time',
		'departure_station_id',
		'departure_station_name',
		'return_station_id',
		'return_station_name',
		'distance',
		'duration',
	];
	const records: JourneyRecord[] = [];
	const streams: Array<string> = [
		'src/data/journeys_2021_05.csv',
		'src/data/journeys_2021_06.csv',
		'src/data/journeys_2021_07.csv',
	];

	console.log(`[Migration] Migrating journeys data...`);

	const handleJourneysFile = (file: string) => {
		console.log(`[Migration] Starting to process file ${file}`);
		return new Promise((resolve, reject) => {
			fs.createReadStream(file)
				.pipe(
					csv({
						skipLines: 1,
						headers: headers,
					}),
				)
				.on('data', async (data: JourneyRecord) => {
					// Skip journeys less than 10 seconds and / or less than 10 meters
					if (data.distance > 9 && data.duration > 9) {
						// Skip records which have missing / incorrect station relations
						// @TODO: We should ask complete list from the client or insert following stations manually
						if (
							data.departure_station_id != 997 &&
							data.return_station_id != 997 &&
							data.departure_station_id != 999 &&
							data.return_station_id != 999 &&
							data.departure_station_id != 754 &&
							data.return_station_id != 754
						) {
							records.push(data);
						}
					}
				})
				.on('end', async () => {
					try {
						// Due to large size of our datasets, we faced some memory issues.
						// Let's use chunks to insert data in smaller batches (apparently Sequelize ORM
						// doesn't support that function anymore - that's why lodash).
						const chunks = _.chunk(records, 1000);
						for (const chunk of chunks) {
							await Journey?.bulkCreate(chunk);
						}
						console.log(
							`[Migration] ${records.length} journeys found and added.`,
						);
						resolve(true);
					} catch (error) {
						console.error(
							`[Migration] Error while migrating journeys: `,
							error,
						);
					}
				})
				.on(
					'error',
					(error: any) => (console.error(error), reject(error)),
				);
		});
	};

	// Go through 3 given journey datasets
	try {
		for (const file of streams) {
			await handleJourneysFile(file);
		}
	} catch (error) {
		console.error(error);
	}

	console.log(`[Migration] Migration of journeys done!`);
};

const migrateData = async () => {
	try {
		await fetchStations();
		await fetchJourneys();
		console.log(`[Migration] Done!`);
		process.exit(1);
	} catch (error) {
		console.error(`[Migration] Error when migrating datasets: `, error);
		process.exit(1);
	}
};

migrateData();
