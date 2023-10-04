import {Router} from "express";
import {commentRouter} from "../comments/commentRouter";
import {PostController} from "../../controllers/postController";

export const postRouter = Router()
const controller: PostController = new PostController()

postRouter.use("/comments", commentRouter)
postRouter.get("/", controller.getPosts)
postRouter.get("/filter", controller.getFiltered)
postRouter.post("/filter", controller.getFiltered)
postRouter.get("/:postId/comments", controller.getComments)
postRouter.get("/:id", controller.getPostById)
postRouter.post("/create", controller.createPost)
postRouter.patch("/update/:id", controller.updatePost)
postRouter.delete("/delete/:id", controller.deletePost)