import express from "express";
import BookController from "../controllers/Book";

const router: express.Router = express.Router();

const bookController = new BookController();

router.route("/").get(bookController.getAll);

router.route("/").post(bookController.create);

router.route("/:id").delete(bookController.delete);

router.route("/:id").put(bookController.update);

export default router;
