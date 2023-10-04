import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            payload: jwt.JwtPayload | string;
        }
    }
}
