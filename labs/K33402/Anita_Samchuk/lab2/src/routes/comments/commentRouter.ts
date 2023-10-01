import {Router} from "express";
import passport from "passport";
import {CommentController} from "../../controllers/commentController";

export const commentRouter = Router()
const controller: CommentController = new CommentController()

commentRouter.get("/", controller.getComments)
commentRouter.get("/:commentId", controller.getCommentById)
commentRouter.get("/author/:authorId", controller.getFiltered)
// commentRouter.post("/create", passport.authenticate('jwt', {session: false}), controller.createComment)
commentRouter.post("/update/:commentId", passport.authenticate('jwt', {session: false}), controller.updateComment)
commentRouter.get("/delete/:commentId", passport.authenticate('jwt', {session: false}), controller.deleteComment)