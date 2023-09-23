import TodoModel from '../models/todoModel'
import TodoError from '../errors/todoError'

class TodoService {
    async findById(id: number): Promise<TodoModel> {
        const todo: TodoModel | null = await TodoModel.findByPk(id)
        if (todo) return todo.toJSON()
        throw new TodoError('Not found!')
    }

    async getById(id: number): Promise<TodoModel> {
        return await this.findById(id)
    }

    async getAll(): Promise<TodoModel[]> {
        return await TodoModel.findAll()
    }

    async update(id: number, todoData: object): Promise<TodoModel | TodoError> {
        try {
            await this.findById(id)
            await TodoModel.update(todoData, {where: {id}})
            return await this.findById(id)
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new TodoError(errors)
        }
    }

    async delete(id: number): Promise<TodoModel> {
        try {
            const deletedTodo: TodoModel = await this.findById(id)
            await TodoModel.destroy({where: {id}})
            return deletedTodo
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new TodoError(errors)
        }
    }

    async create(todoData: any): Promise<TodoModel | TodoError> {
        try {
            const todo = await TodoModel.create(todoData)
            return todo.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new TodoError(errors)
        }
    }
}

export default TodoService
