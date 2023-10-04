import express from "express"
import UserController from '../../controllers/user'
import passport from "../../middlewares/passport";


const router: express.Router = express.Router()

const usercontroller = new UserController()


router.get('/:firstName', 
  passport.authenticate('jwt', {session: false}), usercontroller.me)

router.route('/list')
  .get(usercontroller.get)

router.route('/create')
  .post(usercontroller.post)

router.route('/:id')
  .get(usercontroller.getbyID)

router.route('/update/:id')
  .put(usercontroller.put)

router.route('/delete/:id')
  .delete(usercontroller.delete)


export default router