import * as fs from 'fs';
import csv from 'csv-parser';
import connection from './connection.js';

const { Station, Journey } = connection.models;

type StationRecord = {
	fid: number,
	id: number,
	nimi: string,
	namn: string,
	name: string,
	osoite: string,
	address: string,
	kaupunki: string,
	stad: string,
	operaattori: string,
	kapasiteetti: number,
	x: number,
	y: number
};

type JourneyRecord = {
	departure_time: Date,
	return_time: Date,
	departure_station_id: number,
	departure_station_name: string,
	return_station_id: number,
	return_station_name: string,
	distance: number, // in meters
	duration: number, // in seconds
};

const fetchStations = async () => {

	const headers: Array<string> = [ 'fid', 'id', 'nimi', 'namn', 'name', 'osoite', 'address', 'kaupunki', 'stad', 'operaattori', 'kapasiteetti', 'x', 'y' ];
	const records: StationRecord[] = [];
	var newRecords: number = 0;

	console.log(`[Migration] Migrating stations data...`);
	
	await new Promise((resolve, reject) => {
		fs.createReadStream('src/data/stations.csv')
			.pipe(csv({
				skipLines: 1,
				headers: headers,
			}))
			.on('data', (data: StationRecord) => records.push(data))
			.on('end', () => {
				records.forEach(async (row: StationRecord, key: number) => {

					await Station?.findOrCreate({
						where: {
							SID: row.id
						},
						defaults: {
							SID: row.id,
							name: row.name,
							address: row.address,
							city: row.kaupunki,
							capasity: row.kapasiteetti,
							x: row.x,
							y: row.y
						}
					}).then(([ station, created ]) => {
						if (created) newRecords = newRecords + 1;
					}).catch((error) => {
						console.log(`[Migration] Error when migrating stations: `, error);
					});

					// On last row, let's print out statistics.
					if (Object.is(records.length - 1, key)) {
						console.log(`[Migration] ${records.length} stations found.`);
						console.log(`[Migration] ${newRecords} new stations added.`);
						resolve('done');
					}

				});
			})
			.on('error', (error: any) => (console.error(error), reject('error')));
	});

	console.log(`[Migration] Migration of stations done!`);
}

// const fetchJourneys = () => {}

const migrateData = async () => {
	try {
		await fetchStations();
		// await fetchJourneys();
		console.log(`[Migration] Migration done!`);
		process.exit(1);
	} catch (error) {
		console.error(`[Migration] Error when migrating datasets: `, error);
		process.exit(1);
	}
}

migrateData();
