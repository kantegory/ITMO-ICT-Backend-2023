import Post from "../../models/posts/Post";
import {PostError} from "../../helpers/errors/postError";
import sequelize from "../../providers/db";
import Comment from "../../models/comments/Comment";

const postRepository = sequelize.getRepository(Post)

export class PostService {
    async getAllPosts(): Promise<Post[]> {
        const posts = await postRepository.findAll()
        if (posts) return posts

        return []
    }

    async getPostById(id: number): Promise<Post> {
        const post = await postRepository.findByPk(id)
        if (post) return post

        throw new PostError(`Post with id ${id} not found`)
    }

    async filterByParams(params: any): Promise<Post[]> {
        const posts = await postRepository.findAll({where: params})
        if (posts) return posts

        return []
    }

    async create(postData: Partial<Post>, userId: number): Promise<Post> {
        try {
            postData.userId = userId
            console.log(postData)
            const post = await postRepository.create(postData)
            if (post) return post
            throw new PostError('Could not create post')
        } catch (error: any) {
            throw new PostError(error.message)
        }
    }

    async updatePost(id: number, newData: any, userId: number): Promise<Post> {
        try {
            const post = await postRepository.findByPk(id)
            if (post?.userId !== userId) throw new PostError('Could not edit someone else\'s post')
            if (post) {
                Object.assign(post, newData)
                return await post.save()
            }
            throw new PostError(`Post with id ${id} not found`)
        } catch (error: any) {
            throw new PostError(error.message)
        }
    }

    async deletePost(id: number, userId: number) {
        try {
            const post = await postRepository.findByPk(id)
            if (post) {
                if (post?.userId !== userId) throw new PostError('Could not delete someone else\'s post')
                return await post.destroy()
            }
            throw new Error("Post not found")
        } catch (error: any) {
            throw new PostError(error.message)
        }
    }

    async getComments(postId: number): Promise<Comment[]> {
        const post = await postRepository.findByPk(postId)

        if (post) {
            // @ts-ignore
            const comments = await post.getComments()
            if (comments) return comments
        }
        throw new PostError('Post not found')
    }
}