import express from "express";

const logger: express.RequestHandler = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    console.log(req.method, req.path);
    next();
};
export default logger;
