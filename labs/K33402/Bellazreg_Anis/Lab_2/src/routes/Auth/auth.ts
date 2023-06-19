import AuthController from "../../controllers/auth";
import { Router } from 'express';

const router = Router();
const controller = new AuthController()

router.post('/login',
    controller.login
)


router.post('/register',
    controller.register
)

export default router