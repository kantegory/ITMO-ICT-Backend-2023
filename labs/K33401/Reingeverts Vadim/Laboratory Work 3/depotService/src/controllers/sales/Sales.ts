import express from "express";

import ProductService from "~/services/products/Product";
import BaseController from "~/controllers/BaseController";

class SalesController extends BaseController {
    productService = new ProductService();
    readonly name = "Sales";

    getAll = async (req: express.Request, res: express.Response) => {
        try {
            const productSales = await this.productService.getProductSales();
            res.status(200).json(productSales);
        } catch (error) {
            this.handleError(error, res, `Failed to get all ${this.name}`);
        }
    };

    getCategories = async (req: express.Request, res: express.Response) => {
        try {
            const categories = await this.productService.getDistinctValues("category");
            res.status(200).json({ categories });
        } catch (error) {
            this.handleError(error, res, `Failed to get categories for ${this.name}`);
        }
    };

    getByCategory = async (req: express.Request, res: express.Response) => {
        const { category } = req.params;

        try {
            const productSales = await this.productService.getProductSales({ category });
            res.status(200).json(productSales);
        } catch (error) {
            this.handleError(error, res, `Failed to get ${this.name}`);
        }
    };

    getByProduct = async (req: express.Request, res: express.Response) => {
        const { productId } = req.params;

        try {
            const productSales = await this.productService.getProductSales({
                id: Number(productId),
            });
            res.status(200).json(productSales);
        } catch (error) {
            this.handleError(error, res, `Failed to get ${this.name}`);
        }
    };
}

export default SalesController;
