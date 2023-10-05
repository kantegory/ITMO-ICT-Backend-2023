import {Router} from "express";
import passport from "passport";
import {CommentController} from "../../controllers/commentController";

export const commentRouter = Router()
const controller: CommentController = new CommentController()

commentRouter.get("/:postId", controller.getComments)
commentRouter.get("/:postId/author/:userId", controller.getFiltered)
commentRouter.get("/:postId/:commentId", controller.getCommentById)
commentRouter.post("/:postId/create", passport.authenticate('jwt', {session: false}), controller.createComment)
commentRouter.delete("/:postId/delete/:commentId", passport.authenticate('jwt', {session: false}), controller.deleteComment)