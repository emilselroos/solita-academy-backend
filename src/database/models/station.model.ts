import { Table, Model, Column, DataType } from 'sequelize-typescript';

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
    fid!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id!: number;

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

}
