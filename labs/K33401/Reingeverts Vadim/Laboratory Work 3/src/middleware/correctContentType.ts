import express from "express";

const correctContentType: express.RequestHandler = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (!req.is("application/json")) {
        return res
            .status(400)
            .json({ message: "Header 'Content-Type: application/json' is required" });
    }
    return next();
};
export default correctContentType;
