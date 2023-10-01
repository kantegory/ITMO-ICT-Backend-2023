import sequelize from "../../providers/db";
import {CommentError} from "../../helpers/errors/commentError";
import Comment from "../../models/comments/Comment";

const commentRepository = sequelize.getRepository(Comment)

export class CommentService {
    async getAllComments(postId: number): Promise<Comment[]> {
        const comments = await commentRepository.findAll({where: {'postId': postId}})
        if (comments) return comments

        return []
    }

    async getCommentByPostAndId(postId: number, commentId: number): Promise<Comment> {
        const comment = await commentRepository.findOne({
            where: {
                'postId': postId,
                'id': commentId
            }
        })
        if (comment) return comment

        throw new CommentError(`Comment with id ${commentId} not found`)
    }

    async filterByAuthor(postId: number, authorId: number): Promise<Comment[]> {
        const comments = await commentRepository.findAll({
            where: {
                'authorId': authorId,
                'postId': postId
            }
        })
        if (comments) return comments

        return []
    }

    async create(authorId: number, postId: number, commentData: Partial<Comment>): Promise<Comment> {
        try {
            const comment = await commentRepository.create({
                body: commentData,
                authorId: authorId,
                postId: postId
            })

            return comment.toJSON()
        } catch (error: any) {
            const errors = error.errors.map((error: any) => error.message)
            throw new CommentError(errors)
        }
    }

    async updateComment(postId: number, commentId: number, newData: any): Promise<Comment> {
        try {
            const comment = await commentRepository.findOne({
                where: {
                    'postId': postId,
                    'id': commentId
                }
            })
            if (comment) {
                Object.assign(comment, newData)
                return await comment.save()
            }
            throw new CommentError(`Comment with id ${commentId} not found`)
        } catch (error: any) {
            const errors = error.errors.map((error: any) => error.message)
            throw new CommentError(errors)
        }
    }

    async deleteComment(postId: number, commentId: number) {
        try {
            const comment = await commentRepository.findOne({
                where: {
                    'postId': postId,
                    'id': commentId
                }
            })
            if (comment) {
                return await comment.destroy()
            }
            throw new Error("Invalid identifier")
        } catch (error: any) {
            const errors = error.errors.map((error: any) => error.message)
            throw new CommentError(errors)
        }
    }
}