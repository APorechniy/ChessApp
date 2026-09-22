import type { Request, Response, NextFunction } from "express";
import { decodeJwt } from "../utils/decode-jwt";
import { UsersRepository } from "../repositories";
import { JwtPayload } from "jsonwebtoken";
import { verifyJwt } from "../utils/verify-jwt";
import { AppDataSource } from "../config/ormconfig";
import { getEnvConfig } from "@/config/get-env-config";

const env = getEnvConfig()

export const authCheck = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    if (env.MODE === "dev" && request.headers["X-Cypress-Auth"] === "fjfslkdjflksdjf372y7yfds") {
      next()
    }

    const usersRepository = new UsersRepository(AppDataSource);

    const cookies = request.cookies;
    const jwtToken = cookies["jwt-token"];
    const updateToken = cookies["update-token"];

    if (!jwtToken || !updateToken) {
      throw new Error("Access denied: not allow tokens");
    }

    const decodedToken = decodeJwt(jwtToken) as JwtPayload;
    const verifiedJwt = verifyJwt(jwtToken);

    if (!decodedToken.id) {
      throw new Error("Access denied: incorrect token");
    }

    const user = await usersRepository.getUserById(decodedToken.id);

    if (!user) {
      throw new Error("Access denied: cannot find user");
    }

    next();
  } catch (e: any) {
    console.log(e);
    response.status(401).send("Authorization error");
  }
};
