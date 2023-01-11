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
        allowNull: true,
		defaultValue: null,
    })
    station_number!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
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
    })
    capasity!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    x!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    y!: number;

	// Relations

	@HasMany(() => Journey,  {
		foreignKey: 'departure_station_id',
		onDelete: 'CASCADE'
	})
    departure_journeys: Journey[];

    @HasMany(() => Journey, {
		foreignKey: 'return_station_id',
		onDelete: 'CASCADE'
	})
    return_journeys: Journey[];

}
