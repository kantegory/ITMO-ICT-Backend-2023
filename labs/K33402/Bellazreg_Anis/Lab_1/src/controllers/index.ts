import { v4 as uuidv4 } from "uuid"
import UserService from "../services/user"

// Define a UserController class
class UserController {
    private userService: UserService // Declare a private userService property of type UserService

    constructor() {
        this.userService = new UserService() // Initialize the userService property with a new instance of the UserService class
    }

// Define a get method that retrieves a list of users
    get = async (request: any, response: any) => {
        try {
            const records = await this.userService.listUsers() // Call the listUsers method of the userService property to retrieve a list of users
            return response.json(records); // Return the list of users as a JSON response
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    // Define a post method that creates a new user
    post = async (request: any, response: any) => {
        const id = uuidv4()
        try {
            const record = await this.userService.create({ ...request.body, id})
            return response.json({ record, msg: 'Successfully create user' })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }
    // Define a getbyID method that retrieves a user with the specified ID
    getbyID = async (request: any, response: any) => {
        try {
            const record = await this.userService.getById(request.params.id)
            return response.json(record);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    // Define a put method that updates a user with the specified ID
    put = async (request: any, response: any) => {
        try {
            const record = await this.userService.updateUser(request.params.id, request.body)
            return response.json({record, msg: 'Successfully update user' })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    // Define a delete method that deletes a user with the specified ID
    delete = async (request: any, response: any) => {
        try {
            const record = await this.userService.deleteUser(request.params.id)
            return response.json({msg: 'Successfully delete user' })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default UserController
