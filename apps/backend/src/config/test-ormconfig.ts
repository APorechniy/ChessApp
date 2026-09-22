import { DataSource } from 'typeorm';
import { getEnvConfig } from './get-env-config';
import * as entities from '@/entities/';

const env = getEnvConfig();

export const TestDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Rhbcnbyf_1",
    database: "chesstest",
    synchronize: false,
    logging: false,
    timezone: "Z",
    connectorPackage: 'mysql2',
    entities: Object.values(entities),
    migrations: ['src/migrations/**/*.ts'],
    dateStrings: true,
})