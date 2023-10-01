import {CommentService} from "../services/comments/commentService";
import {Request, Response} from "express";
import Comment from "../models/comments/Comment";
import {CommentError} from "../helpers/errors/commentError";

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
        const {postId, commentId} = request.params
        try {
            const comments: Comment[] | CommentError = await this.commentService.filterByAuthor(+postId, +commentId)

            response.status(200).json(comments)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    // createComment = async (request: Request, response: Response) => {
    //     const {postId} = request.params
    //     const {body} = request
    //     try {
    //         const userId = request.user ? request.user.id : null;
    //         if (userId !== null) {
    //             const comment: Comment | CommentError = await this.commentService.create(+userId, +postId, body)
    //
    //             response.status(201).json(comment)
    //         }
    //     } catch (error: any) {
    //         response.status(404).json({error: error.message})
    //     }
    // }

    updateComment = async (request: Request, response: Response) => {
        const {body} = request
        const {postId, commentId} = request.params
        try {
            const comment: Comment | CommentError = await this.commentService.updateComment(+postId, +commentId, body)

            response.status(201).json(comment)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    deleteComment = async (request: Request, response: Response) => {
        const {postId, commentId} = request.params
        try {
            await this.commentService.deleteComment(+postId, +commentId)

            response.status(204)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }
}