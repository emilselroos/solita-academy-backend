import { Table, Model, Column, DataType, BelongsTo } from 'sequelize-typescript';
import { Station } from './station.model.js';

@Table({
    tableName: 'journeys',
    timestamps: false,
})
export class Journey extends Model {

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
				msg: `Departure time can't be null.`
			},
			isDate: {
				msg: `Departure Time has to be date.`,
				args: true
			}
		}
    })
    departure_time!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
		validate: {
			notNull: {
				msg: `Return time can't be null.`
			},
			isDate: {
				msg: `Return Time has to be date.`,
				args: true
			}
		}
    })
    return_time!: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
		references: {
            model: 'stations',
            key: 'station_number'
        },
		validate: {
			notNull: {
				msg: `You have to set a proper station number for departure station.`
			},
			isInt: {
				msg: `Station number must be a number!`
			}
		}
    })
    departure_station_id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
		references: {
            model: 'stations',
            key: 'station_number'
        },
		validate: {
			notNull: {
				msg: `You have to set a proper station number for return station.`
			},
			isInt: {
				msg: `Station number must be a number!`
			}
		}
    })
    return_station_id!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
		validate: {
			notNull: {
				msg: `Distance can't be null.`
			}
		}
    })
    distance!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
		validate: {
			notNull: {
				msg: `Duration can't be null.`
			}
		}
    })
    duration!: number;

    // Relations

    @BelongsTo(() => Station,  {
		as: 'departure_station',
		foreignKey: 'departure_station_id',
		onDelete: 'CASCADE'
	})
    departure_station: Station;

    @BelongsTo(() => Station, {
		as: 'return_station',
		foreignKey: 'return_station_id',
		onDelete: 'CASCADE'
	})
    return_station: Station;

}
