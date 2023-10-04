import {CommentService} from "../services/comments/commentService";
import {Request, Response} from "express";
import Comment from "../models/comments/Comment";
import {CommentError} from "../helpers/errors/commentError";
import post from "../models/posts/Post";
import {getUser} from "../utils/getUser";

export class CommentController {
    private commentService: CommentService

    constructor() {
        this.commentService = new CommentService()
    }

    getComments = async (request: Request, response: Response) => {
        const {postId} = request.params
        try {
            const comments: Comment[] | CommentError = await this.commentService.getAllComments(+postId)

            response.status(200).json(comments)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    getCommentById = async (request: Request, response: Response) => {
        const {postId, commentId} = request.params
        try {
            const comment: Comment | CommentError = await this.commentService.getCommentByPostAndId(+postId, +commentId)

            response.status(200).json(comment)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    getFiltered = async (request: Request, response: Response) => {
        const {postId, userId} = request.params
        try {
            const comments: Comment[] | CommentError = await this.commentService.filterByAuthor(+postId, +userId)

            response.status(200).json(comments)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    createComment = async (request: Request, response: Response) => {
        console.log("Я тут был!!")
        try {
            const {postId} = request.params
            const {body} = request
            const userId = await getUser(request.headers.authorization)
            const comment: Comment | CommentError = await this.commentService.create(userId, +postId, body)

            response.status(201).json(comment)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    deleteComment = async (request: Request, response: Response) => {
        const {postId, commentId} = request.params

        try {
            const userId = await getUser(request.headers.authorization)
            await this.commentService.deleteComment(+postId, +commentId, userId)

            response.status(200).json({message: 'Comment Deleted'})
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }
}