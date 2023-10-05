import {Router} from "express";
import {commentRouter} from "../comments/commentRouter";
import {PostController} from "../../controllers/postController";
import passport from "passport";

export const postRouter = Router()
const controller: PostController = new PostController()

postRouter.use("/comments", commentRouter)
postRouter.get("/", controller.getPosts)
postRouter.get("/filter", controller.getFiltered)
postRouter.get("/:postId/comments", controller.getComments)
postRouter.get("/:id", controller.getPostById)
postRouter.post("/create", passport.authenticate('jwt', {session: false}), controller.createPost)
postRouter.patch("/update/:id", passport.authenticate('jwt', {session: false}), controller.updatePost)
postRouter.delete("/delete/:id", passport.authenticate('jwt', {session: false}), controller.deletePost)