import {Request, Response} from "express";
import {PostService} from "../services/posts/postService";
import Post from "../models/posts/Post";
import {PostError} from "../helpers/errors/postError";
import User from "../models/users/User";
import {use} from "passport";
import Comment from "../models/comments/Comment";
import {CommentError} from "../helpers/errors/commentError";

export class PostController {
    private postService: PostService

    constructor() {
        this.postService = new PostService()
    }

    getPosts = async (request: Request, response: Response) => {
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
            const user = request.user
            if (user) {
                const post: Post | PostError = await this.postService.create(body, user?.id)
                response.status(201).json(post)
            } else {
                throw new PostError("User not found")
            }
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    updatePost = async (request: Request, response: Response) => {
        const {body} = request
        const {id} = request.params
        const userId = request.user?.id
        try {
            const post: Post | PostError = await this.postService.updatePost(+id, body, userId)

            response.status(201).json(post)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    deletePost = async (request: Request, response: Response) => {
        try {
            await this.postService.deletePost(+request.params.id, request.user?.id)

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