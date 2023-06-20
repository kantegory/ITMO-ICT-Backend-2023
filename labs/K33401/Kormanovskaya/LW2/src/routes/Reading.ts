import express from "express";
import ReadingController from "../controllers/Reading";
import {checkJWT} from "../middlewares/checkJWT";

const router: express.Router = express.Router();

const readingController = new ReadingController();

router.route("/").get(readingController.getAll);

router.route("/").post(checkJWT, readingController.create);

router.route("/:id").delete(checkJWT, readingController.delete);

router.route("/:id").put(checkJWT, readingController.update);

export default router;
