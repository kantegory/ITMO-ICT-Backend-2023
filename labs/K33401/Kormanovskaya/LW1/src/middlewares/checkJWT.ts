import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import * as jwt from "jsonwebtoken";
import AuthService from "../services/Auth";
import { JwtPayload } from "jsonwebtoken";

const authService = new AuthService();

export const checkJWT = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = <string>request.headers["auth"];
  let jwtPayload: JwtPayload | string;

  try {
    jwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    response.locals.jwtPayload = jwtPayload;
    const user = await authService.getUserTokenVersion(jwtPayload.username);
    if (user.tokenVersion != jwtPayload.v) {
      throw {
        status: 404,
        message: "Not Found",
      };
    }
  } catch (error) {
    response.status(401).send({
      error: "Invalid token",
    });
    return;
  }

  next();
};
