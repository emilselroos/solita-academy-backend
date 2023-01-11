import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Journey } from './journey.model.js';

@Table({
    tableName: 'stations',
    timestamps: false,
})
export class Station extends Model {

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
			}
		}
    })
    station_number!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
		validate: {
			notNull: {
				msg: `Station must have a name!`
			},
			len: {
				msg: `Station name has to be 3 - 240 characters long.`,
				args: [ 3, 240 ]
			}
		}
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
		validate: {
			notNull: {
				msg: `Station must have an address!`
			},
			len: {
				msg: `Station address has to be 3 - 240 characters long.`,
				args: [ 3, 240 ]
			}
		}
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
				msg: `Station must have a capasity!`
			},
			isInt: {
				msg: `Capasity has to be a number!`,
				args: true
			}
		}
    })
    capasity!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
		validate: {
			notNull: {
				msg: `Station must have coordinates!`
			},
			isFloat: {
				msg: `X has to be a floating number!`,
				args: true
			}
		}
    })
    x!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
		validate: {
			notNull: {
				msg: `Station must have coordinates!`
			},
			isFloat: {
				msg: `Y has to be a floating number!`,
				args: true
			}
		}
    })
    y!: number;

	// Relations

	@HasMany(() => Journey,  {
		as: 'departure_journeys',
		foreignKey: 'departure_station_id',
		onDelete: 'CASCADE'
	})
    departure_journeys: Journey[];

    @HasMany(() => Journey, {
		as: 'return_journeys',
		foreignKey: 'return_station_id',
		onDelete: 'CASCADE'
	})
    return_journeys: Journey[];

}
