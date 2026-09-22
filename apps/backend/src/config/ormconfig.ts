import { DataSource } from 'typeorm';
import { getEnvConfig } from './get-env-config';
import * as entities from '@/entities/';

const env = getEnvConfig();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.MODE === "production" ? env.DATABASE_HOST : "localhost",
    port: env.MODE === "production" ? Number(env.DATABASE_PORT) : 3306,
    username: env.MODE === "production" ? env.DATABASE_USER : "root",
    password: env.MODE === "production" ? env.DATABASE_PASSWORD : "Rhbcnbyf_1",
    database: env.MODE === "production" ? env.DATABASE_NAME : "chess",
    synchronize: false,
    logging: env.MODE === "production" ? ["error"] : true,
    timezone: "Z",
    connectorPackage: 'mysql2',
    entities: Object.values(entities),
    migrations: ['src/migrations/**/*.ts'],
    dateStrings: true,
})