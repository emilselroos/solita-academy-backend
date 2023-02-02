import connection from './connection.js';
const { Station, Journey } = connection.models;

const resetDatabase = async () => {
	console.log(`[Data for tests] Clearing database data...`);
	await connection.authenticate();
	await connection.sync({ force: true });
	console.log(`[Data for tests] Populating database with test data...`);
	await Station?.bulkCreate([
		{
			station_number: 100,
			name: 'Testiasema I',
			city: 'Espoo',
			address: 'Testikatu 17',
			capasity: 21,
			x: 61.4955653,
			y: 23.7454209,
		},
		{
			station_number: 200,
			name: 'Testiasema II',
			city: 'Espoo',
			address: 'Testikatu 27',
			capasity: 21,
			x: 61.4955653,
			y: 23.7454209,
		},
		{
			station_number: 300,
			name: 'Testiasema III',
			city: 'Espoo',
			address: 'Testikatu 37',
			capasity: 21,
			x: 61.4955653,
			y: 23.7454209,
		},
	]);
	await Journey?.bulkCreate([
		{
			departure_station_id: 100,
			return_station_id: 200,
			duration: 112,
			distance: 2442,
			departure_time: new Date(),
			return_time: new Date(),
		},
		{
			departure_station_id: 100,
			return_station_id: 200,
			duration: 112,
			distance: 2442,
			departure_time: new Date(),
			return_time: new Date(),
		},
		{
			departure_station_id: 100,
			return_station_id: 200,
			duration: 112,
			distance: 2442,
			departure_time: new Date(),
			return_time: new Date(),
		},
		{
			departure_station_id: 100,
			return_station_id: 200,
			duration: 112,
			distance: 2442,
			departure_time: new Date(),
			return_time: new Date(),
		},
		{
			departure_station_id: 100,
			return_station_id: 200,
			duration: 112,
			distance: 2442,
			departure_time: new Date(),
			return_time: new Date(),
		},
		{
			departure_station_id: 200,
			return_station_id: 100,
			duration: 112,
			distance: 2442,
			departure_time: new Date(),
			return_time: new Date(),
		},
		{
			departure_station_id: 200,
			return_station_id: 100,
			duration: 112,
			distance: 2442,
			departure_time: new Date(),
			return_time: new Date(),
		},
		{
			departure_station_id: 200,
			return_station_id: 100,
			duration: 112,
			distance: 2442,
			departure_time: new Date(),
			return_time: new Date(),
		},
		{
			departure_station_id: 300,
			return_station_id: 200,
			duration: 112,
			distance: 2442,
			departure_time: new Date(),
			return_time: new Date(),
		},
	]);
	console.log(`[Data for tests] Done!`);
	process.exit(1);
};

if (process.env.NODE_ENV === 'development') {
	resetDatabase();
} else {
	console.log(
		`[Data for tests] This script only works when NODE_ENV = development\rTry again when you are less drunk`,
	);
}
