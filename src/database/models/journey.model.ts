import {
	Table,
	Model,
	Column,
	DataType,
	BelongsTo,
} from 'sequelize-typescript';
import { Station } from './station.model.js';

export interface JourneyAttributes {
	JID: number;
	departure_time: Date;
	return_time: Date;
	departure_station_id: number;
	return_station_id: number;
	distance: number;
	duration: number;
}

@Table({
	tableName: 'journeys',
	timestamps: false,
})
export class Journey extends Model<JourneyAttributes> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	})
	JID!: number;

	@Column({
		type: DataType.DATE,
		allowNull: false,
		validate: {
			notNull: {
				msg: `Departure time can't be null.`,
			},
			isDate: {
				msg: `Departure Time has to be date.`,
				args: true,
			},
		},
	})
	departure_time!: Date;

	@Column({
		type: DataType.DATE,
		allowNull: false,
		validate: {
			notNull: {
				msg: `Return time can't be null.`,
			},
			isDate: {
				msg: `Return Time has to be date.`,
				args: true,
			},
		},
	})
	return_time!: Date;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: `You have to set a proper station number for departure station.`,
			},
			isInt: {
				msg: `Station number must be a number!`,
			},
		},
	})
	departure_station_id!: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: `You have to set a proper station number for return station.`,
			},
			isInt: {
				msg: `Station number must be a number!`,
			},
		},
	})
	return_station_id!: number;

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
		validate: {
			notNull: {
				msg: `Distance can't be null.`,
			},
			isInt: {
				msg: `Distance must be a number!`,
			},
		},
	})
	distance!: number;

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
		validate: {
			notNull: {
				msg: `Duration can't be null.`,
			},
			isInt: {
				msg: `Duration must be a number!`,
			},
		},
	})
	duration!: number;

	// Relations

	@BelongsTo(() => Station, {
		as: 'departure_station',
		targetKey: 'station_number',
		foreignKey: 'departure_station_id',
		onDelete: 'CASCADE',
	})
	departure_station: Station;

	@BelongsTo(() => Station, {
		as: 'return_station',
		targetKey: 'station_number',
		foreignKey: 'return_station_id',
		onDelete: 'CASCADE',
	})
	return_station: Station;
}
