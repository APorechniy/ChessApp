import jwt from "jsonwebtoken";

export const verifyJwt = (jwtToken: string) => {
  const secretKey = process.env.SECRET_JWT_KEY || "local";

  const decodedJwt = jwt.verify(jwtToken, secretKey);

  return decodedJwt;
};
