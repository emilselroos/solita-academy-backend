import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Journey } from './journey.model.js';

export interface StationAttributes {
	SID: number;
	station_number: number;
	name: string;
	address: string;
	city: string;
	capasity: number;
	x: number;
	y: number;
}

@Table({
	tableName: 'stations',
	timestamps: false,
})
export class Station extends Model<StationAttributes> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	})
	SID!: number;

	@Column({
		type: DataType.INTEGER,
		unique: true,
		allowNull: false,
		validate: {
			notNull: {
				msg: `Station must have a station number!`,
			},
			isInt: {
				msg: `Station number must be a number!`,
			},
		},
	})
	station_number!: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: `Station must have a name!`,
			},
			len: {
				msg: `Station name has to be 3 - 240 characters long.`,
				args: [3, 240],
			},
		},
	})
	name!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: `Station must have an address!`,
			},
			len: {
				msg: `Station address has to be 3 - 240 characters long.`,
				args: [3, 240],
			},
		},
	})
	address!: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	city: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: `Station must have a capasity!`,
			},
			isInt: {
				msg: `Capasity has to be a number!`,
			},
		},
	})
	capasity!: number;

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
		validate: {
			notNull: {
				msg: `Station must have coordinates!`,
			},
			isFloat: {
				msg: `X has to be a floating number!`,
			},
		},
	})
	x!: number;

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
		validate: {
			notNull: {
				msg: `Station must have coordinates!`,
			},
			isFloat: {
				msg: `Y has to be a floating number!`,
			},
		},
	})
	y!: number;

	// Relations

	@HasMany(() => Journey, {
		as: 'departure_journeys',
		sourceKey: 'station_number',
		foreignKey: 'departure_station_id',
		onDelete: 'CASCADE',
	})
	departure_journeys: Journey[];

	@HasMany(() => Journey, {
		as: 'return_journeys',
		sourceKey: 'station_number',
		foreignKey: 'return_station_id',
		onDelete: 'CASCADE',
	})
	return_journeys: Journey[];
}
