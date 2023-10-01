import Post from "../../models/posts/Post";
import {PostError} from "../../helpers/errors/postError";
import sequelize from "../../providers/db";
import User from "../../models/users/User";

const postRepository = sequelize.getRepository(Post)
const userRepository = sequelize.getRepository(User)

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

    async create(body: Partial<Post>, user: Express.User, userId: number): Promise<Post> {
        try {
            const newPostData = {...body, user, userId}
            const post = await postRepository.create(newPostData)
            console.log("ПОСТ:" + JSON.stringify(post))
            if (userId) {
                const user = await User.findByPk(userId);
                if (user) {
                    const updatedUser = await user.$add('posts', post)
                    console.log(updatedUser)
                }
            }

            return post.toJSON()
        } catch (error: any) {
            const errors = error.errors.map((error: any) => error.message)
            throw new PostError(errors)
        }
    }

    async updatePost(id: number, newData: any): Promise<Post> {
        try {
            const post = await postRepository.findByPk(id)
            if (post) {
                Object.assign(post, newData)
                return await post.save()
            }
            throw new PostError(`Post with id ${id} not found`)
        } catch (error: any) {
            const errors = error.errors.map((error: any) => error.message)
            throw new PostError(errors)
        }
    }

    async deletePost(id: number) {
        try {
            const post = await postRepository.findByPk(id)
            if (post) {
                return await post.destroy()
            }
            throw new Error("Invalid identifier")
        } catch (error: any) {
            const errors = error.errors.map((error: any) => error.message)
            throw new PostError(errors)
        }
    }
}