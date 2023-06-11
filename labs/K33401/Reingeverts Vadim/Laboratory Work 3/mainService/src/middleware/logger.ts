import express from "express";

const logger = (name: string) => {
    const handler: express.RequestHandler = (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.info(name + ":", req.method, req.path);
        next();
    };
    return handler;
};

export default logger;
