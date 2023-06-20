import express from "express";
import ReadingController from "../controllers/Reading";

const router: express.Router = express.Router();

const readingController = new ReadingController();

router.route("/").get(readingController.getAll);

router.route("/").post(readingController.create);

router.route("/:id").delete(readingController.delete);

router.route("/:id").put(readingController.update);

export default router;
