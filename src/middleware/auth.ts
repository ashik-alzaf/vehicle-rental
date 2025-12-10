import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const token = header.split(" ")[1];
    if (!token) {
      res.status(500).json({
        message: "You are not allowed",
      });
    }
    const decoded = jwt.verify(
      token as string,
      config.secret as string
    ) as JwtPayload;
    req.user = decoded;
    if (roles.length && !roles.includes(decoded.role as string)) {
      return res.status(500).json({
        error: "Unauthorized!!",
      });
    }
    next();
  };
};
export default auth;
