import { Table, Model, Column, DataType } from 'sequelize-typescript';

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
    })
    departure_station_id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    return_station_id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    distance!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    duration!: number;

}
