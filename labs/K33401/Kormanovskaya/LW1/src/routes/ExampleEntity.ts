import express from "express";
import ExampleController from "../controllers/ExampleController";

const router: express.Router = express.Router();

const exampleController = new ExampleController();

router.route("/").get(exampleController.getAll);

router.route("/").post(exampleController.create);

router.route("/:id").delete(exampleController.delete);

router.route("/:id").put(exampleController.update);

export default router;
