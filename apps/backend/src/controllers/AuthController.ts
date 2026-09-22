import type { Request, Response, NextFunction, Application } from "express";
import { AuthService } from "../services";
import { createJwt } from "../utils/create-jwt";
import { decodeJwt } from "../utils/decode-jwt";
import jsonwebtoken from "jsonwebtoken";
import { authCheck } from "../interceptors/auth-check";

type CookieSameSite = "lax" | "strict" | "none";

const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;
const COOKIE_SAME_SITE = process.env.COOKIE_SAME_SITE as CookieSameSite;
const COOKIE_SECURE = Boolean(process.env.COOKIE_SECURE === "true");

export class AuthController {
  constructor(
    private authService: AuthService,
    private logger: Console = console,
  ) { }

  async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = req.body;
      const tokens = await this.authService.authUser(username, password);

      if (!tokens) {
        throw new Error("Incorrect user");
      } else {
        res.cookie("jwt-token", tokens.jwtToken, {
          domain: COOKIE_DOMAIN,
          path: "/",
          httpOnly: true,
          secure: COOKIE_SECURE,
          maxAge: 3600000,
          sameSite: COOKIE_SAME_SITE,
        });
        res.cookie("update-token", tokens.updateToken, {
          domain: COOKIE_DOMAIN,
          path: "/",
          httpOnly: true,
          secure: COOKIE_SECURE,
          maxAge: 864000 * 1000,
          sameSite: COOKIE_SAME_SITE,
        });
        res.status(200).send();

        return;
      }
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async updateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const cookie = req.cookies;

      const jwtToken = cookie["jwt-token"];
      const updateToken = cookie["update-token"];

      const decodedJwt = decodeJwt(jwtToken) as jsonwebtoken.JwtPayload;
      const decodedUpdate = decodeJwt(updateToken) as jsonwebtoken.JwtPayload;

      const verifiedUpdate = jsonwebtoken.verify(
        updateToken,
        process.env.SECRET_JWT_KEY || "local",
      );

      if (
        decodedJwt &&
        decodedUpdate &&
        decodedJwt.id === decodedUpdate.id &&
        verifiedUpdate
      ) {
        const newTokens = createJwt(decodedJwt.id);

        res.cookie("jwt-token", newTokens.jwtToken, {
          domain: COOKIE_DOMAIN,
          path: "/",
          httpOnly: true,
          secure: COOKIE_SECURE,
          maxAge: 3600000,
          sameSite: COOKIE_SAME_SITE,
        });
        res.cookie("update-token", newTokens.updateToken, {
          domain: COOKIE_DOMAIN,
          path: "/",
          httpOnly: true,
          secure: COOKIE_SECURE,
          maxAge: 864000 * 1000,
          sameSite: COOKIE_SAME_SITE,
        });
        res.status(200).send();
      } else {
        res.clearCookie("jwt-token");
        res.clearCookie("update-token");
        res.status(401).send("Unauthorized");
      }
    } catch (e) {
      console.log(e);
      res.status(403).send("Internal error");
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("jwt-token");
    res.clearCookie("update-token");
    res.status(200).send();
  }

  setupRoutes(app: Application) {
    app.post("/auth/sign-in", (req, res, next) => this.signIn(req, res, next));
    app.get("/auth/update-tokens", (req, res, next) =>
      this.updateToken(req, res, next),
    );
    app.get("/auth/logout", (req, res, next) =>
      this.logout(req, res, next),
    );
  }
}
