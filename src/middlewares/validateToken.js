import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) return res.status(401).json({ message: "Session expired" });

    req.userInfo = decodedToken;

    next();
  });
};
