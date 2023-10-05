import sequelize from "../../providers/db";
import {CommentError} from "../../helpers/errors/commentError";
import Comment from "../../models/comments/Comment";
import Post from "../../models/posts/Post";

const commentRepository = sequelize.getRepository(Comment)
const postRepository = sequelize.getRepository(Post)

export class CommentService {
    async getAllComments(postId: number): Promise<Comment[]> {
        const comments = await commentRepository.findAll({where: {'postId': postId}})
        if (comments) return comments

        throw new CommentError("Post not found")
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

    async filterByAuthor(postId: number, userId: number): Promise<Comment[]> {
        try {
            const comments = await commentRepository.findAll({
                where: {
                    'userId': userId,
                    'postId': postId
                }
            })
            if (comments) return comments

            return []
        } catch (error: any) {
            throw new CommentError(error.message)
        }
    }

    async create(userId: number, postId: number, commentData: Partial<Comment>): Promise<Comment> {
        try {
            const post = await postRepository.findByPk(postId)
            if (post) {
                commentData.userId = userId

                // @ts-ignore
                const comment = await post.createComment(commentData)
                return comment
            }
            throw new CommentError('User or post not found')
        } catch (error: any) {
            throw new CommentError(error.message)
        }
    }

    async deleteComment(postId: number, commentId: number, userId: number) {
        try {
            const comment = await commentRepository.findOne({
                where: {
                    'postId': postId,
                    'id': commentId
                }
            })

            if (comment) {
                if (comment?.userId !== userId) throw new Error("Could not delete someone else\'s comments")
                return await comment.destroy()
            }
            throw new Error("Comment not found")
        } catch (error: any) {
            throw new CommentError(error)
        }
    }
}