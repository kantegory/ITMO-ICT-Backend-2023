import express from "express";
import GenreController from "../controllers/Genre";

const router: express.Router = express.Router();

const genreController = new GenreController();

router.route("/").get(genreController.getAll);

router.route("/").post(genreController.create);

router.route("/:id").delete(genreController.delete);

router.route("/:id").put(genreController.update);

export default router;
