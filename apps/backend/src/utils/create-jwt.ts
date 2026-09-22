import jwt from "jsonwebtoken";

export const createJwt = (id: string) => {
  const secretKey = process.env.SECRET_JWT_KEY || "local";

  const token = jwt.sign({ id }, secretKey, { expiresIn: "2d", subject: id });
  const updateToken = jwt.sign({ id }, secretKey, {
    expiresIn: "14d",
    subject: id,
  });

  return {
    jwtToken: token,
    updateToken: updateToken,
  };
};
