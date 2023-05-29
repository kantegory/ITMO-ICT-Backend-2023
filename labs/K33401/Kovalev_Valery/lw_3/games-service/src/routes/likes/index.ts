import express from "express";
import LikesController from "../../controllers/likes/LikesController";

const router: express.Router = express.Router()

const controller: LikesController = new LikesController()

router.route('/')
    .get(controller.get)

router.route("/create").post(controller.post)

router.route("/:id").delete(controller.delete)

export default router;