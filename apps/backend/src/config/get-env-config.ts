import { config } from "dotenv";

type EnvType = {
  MODE: string;
  API_PORT: number;
  WS_PORT: string;
  SECRET_JWT_KEY: string;

  DATABASE_HOST: string;
  DATABASE_PORT: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;

  UKASSA_API: string;
};

export const getEnvConfig = () => {
  if (process.env.MODE === "production") {
    return process.env as unknown as EnvType
  } else {
    const env = config();

    return env.parsed as unknown as EnvType;
  }
};
