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
    })
    departure_time!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    return_time!: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
		references: {
            model: 'stations',
            key: 'station_number'
        },
    })
    departure_station_id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
		references: {
            model: 'stations',
            key: 'station_number'
        },
    })
    return_station_id!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    distance!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    duration!: number;

    // Relations

    @BelongsTo(() => Station,  {
		foreignKey: 'departure_station_id',
		onDelete: 'CASCADE'
	})
    departure_station: Station;

    @BelongsTo(() => Station, {
		foreignKey: 'return_station_id',
		onDelete: 'CASCADE'
	})
    return_station: Station;

}
