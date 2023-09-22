import express from "express";
import userRoutes from "./userRoutes";
import todoRoutes from "./todoRoutes";
import placeRoutes from "./placeRoutes";
import eventRoutes from "./eventRoutes";
import eventTypeRoutes from "./eventTypeRoutes";
import registrationRoutes from "./registrationRoutes";

const router: express.Router = express.Router();

router.use('/users', userRoutes);
router.use('/todos', todoRoutes);
router.use('/places', placeRoutes);
router.use('/events', eventRoutes);
router.use('/eventTypes', eventTypeRoutes);
router.use('/registrations', registrationRoutes);

export default router;
