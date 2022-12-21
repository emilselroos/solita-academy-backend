import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();

import { Station } from './models/station.model.js';

const DB_NAME = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST || 'localhost';

const connection = new Sequelize({
    // Connection
    dialect: 'postgres',
    host: DB_HOST,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    // Models
    models: [ Station ],
    // Settings
    logging: false,
});

export default connection;
