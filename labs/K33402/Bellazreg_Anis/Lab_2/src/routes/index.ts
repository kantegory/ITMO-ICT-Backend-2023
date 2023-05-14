import { Router } from 'express';

import auth from './Auth/auth';
import attendance from './Attendance/attendance';
import event from './Event/event';
import user from './User/user';

const router = Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/event', event);
router.use('/attendance', attendance);

export default router