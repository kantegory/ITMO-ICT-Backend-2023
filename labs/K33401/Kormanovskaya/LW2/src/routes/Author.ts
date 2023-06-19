import express from "express";
import AuthorController from "../controllers/Author";

const router: express.Router = express.Router();

const authorController = new AuthorController();

router.route("/").get(authorController.getAll);

router.route("/").post(authorController.create);

router.route("/:id").delete(authorController.delete);

router.route("/:id").put(authorController.update);

export default router;
