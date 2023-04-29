import express from "express";
import jwt from "jsonwebtoken";

/* Handle jwt check for protected routes */
const isAuthenticated = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const { authorization } = req.headers;

    // TODO nicer error pages
    if (!authorization) {
        res.status(401);
        throw new Error("🚫 Un-Authorized 🚫");
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
        req.payload = payload;
    } catch (err) {
        res.status(401);
        if (err instanceof Error && err.name === "TokenExpiredError") {
            throw new Error(err.name);
        }
        throw new Error("🚫 Un-Authorized 🚫");
    }

    return next();
};
export default isAuthenticated;
