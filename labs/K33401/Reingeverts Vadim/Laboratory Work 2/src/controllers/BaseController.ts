import express from "express";

class BaseController {
    protected handleError = (
        error: unknown,
        res: express.Response,
        defaultMessage = "Unkown error"
    ) => {
        let errorMessage = defaultMessage;
        if (error instanceof Error) errorMessage = error.message;

        res.status(400).send({ message: errorMessage });
    };
}

export default BaseController;
