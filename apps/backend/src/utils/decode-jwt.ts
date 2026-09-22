import jwt from "jsonwebtoken";

export const decodeJwt = (jwtToken: string) => {
  const decodedJwt = jwt.decode(jwtToken);

  return decodedJwt;
};
