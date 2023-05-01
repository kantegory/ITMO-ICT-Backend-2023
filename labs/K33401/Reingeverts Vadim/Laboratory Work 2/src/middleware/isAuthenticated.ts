import express from "express";
import jwt from "jsonwebtoken";

/* Handle jwt check for protected routes */
const isAuthenticated = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const { authorization } = req.headers;
    return next(); // TOREMOVE

    if (!authorization) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
        req.payload = payload;
    } catch (err) {
        if (err instanceof Error && err.name === "TokenExpiredError") {
            res.status(401).json({ message: err.name });
            return;
        }
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    return next();
};
export default isAuthenticated;
