import express from "express";

import BaseController from "~/controllers/BaseController";

class CrudController extends BaseController {
    protected providerService: any; // TODO make type/interface
    name = "Unnamed";

    getAll = async (req: express.Request, res: express.Response) => {
        try {
            const items = await this.providerService.getAll();
            res.status(200).json(items);
        } catch (error) {
            this.handleError(error, res, `Failed to get all ${this.name}`);
        }
    };

    get = async (req: express.Request, res: express.Response) => {
        const id = Number(req.params.id);

        try {
            const item = await this.providerService.getById(id);
            if (!item) {
                res.status(404).json({ message: `${this.name} with the id ${id} does not exist` });
                return;
            }
            res.status(200).json(item);
        } catch (error) {
            this.handleError(error, res, `Failed to get ${this.name}`);
        }
    };

    post = async (req: express.Request, res: express.Response) => {
        const { body } = req;

        try {
            const item = await this.providerService.create(body);
            res.status(200).json(item);
        } catch (error) {
            this.handleError(error, res, `Failed to create ${this.name}`);
        }
    };

    patch = async (req: express.Request, res: express.Response) => {
        const { body } = req;
        const id = Number(req.params.id);

        try {
            const item = await this.providerService.update(id, body);
            res.status(200).json(item);
        } catch (error) {
            this.handleError(error, res, `Failed to update ${this.name}`);
        }
    };

    delete = async (req: express.Request, res: express.Response) => {
        const id = Number(req.params.id);

        try {
            await this.providerService.delete(id);
            res.status(204).json();
        } catch (error) {
            this.handleError(error, res, `Failed to delete ${this.name}`);
        }
    };
}

export default CrudController;
