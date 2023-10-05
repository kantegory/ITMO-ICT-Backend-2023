import {Request, Response} from "express";
import {PostService} from "../services/posts/postService";
import Post from "../models/posts/Post";
import {PostError} from "../helpers/errors/postError";
import Comment from "../models/comments/Comment";
import {CommentError} from "../helpers/errors/commentError";
import {getUser} from "../utils/getUser";

export class PostController {
    private postService: PostService

    constructor() {
        this.postService = new PostService()
    }

    getPosts = async (request: Request, response: Response) => {
        console.log("Я тут!")
        try {
            const posts: Post[] | PostError = await this.postService.getAllPosts()

            response.status(200).json(posts)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    getPostById = async (request: Request, response: Response) => {
        try {
            const post: Post | PostError = await this.postService.getPostById(+request.params.id)

            response.status(200).json(post)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    getFiltered = async (request: Request, response: Response) => {
        const {body} = request
        try {
            const posts: Post[] | PostError = await this.postService.filterByParams(body)
            response.status(200).json(posts)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    createPost = async (request: Request, response: Response) => {
        try {
            const {body} = request
            const userId = await getUser(request.headers.authorization)
            const post: Post | PostError = await this.postService.create(body, userId)
            response.status(201).json(post)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    updatePost = async (request: Request, response: Response) => {
        const {body} = request
        const {id} = request.params

        try {
            const userId = await getUser(request.headers.authorization)
            const post: Post | PostError = await this.postService.updatePost(+id, body, userId)

            response.status(201).json(post)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    deletePost = async (request: Request, response: Response) => {
        try {
            const userId = await getUser(request.headers.authorization)
            await this.postService.deletePost(+request.params.id, userId)

            response.status(200).json({message: 'Post is deleted'})
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    getComments = async (request: Request, response: Response) => {
        try {
            console.log(request.params)
            const comments: Comment[] | CommentError = await this.postService.getComments(+request.params.postId)
            response.status(200).json(comments)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }
}