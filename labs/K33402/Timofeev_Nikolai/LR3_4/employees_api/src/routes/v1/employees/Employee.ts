import express from "express";
import EmployeeController from "../../../controllers/Employee";

const router: express.Router = express.Router();

const controller: EmployeeController = new EmployeeController();

router.route("/").post(controller.post);
router.route("/").get(controller.getAll);
router.route("/:id").get(controller.get);
router.route("/:id").delete(controller.changeStatus);

export default router;