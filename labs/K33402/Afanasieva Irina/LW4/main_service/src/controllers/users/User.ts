import axios from 'axios'
import {authConfig} from '../../configs'


class UserController {
    private async requestProxy(url: string, method: any, expressResponse: any, body: any = null) {
        axios({
            method: method,
            url: `http://${authConfig.host}:${authConfig.port}${url}`,
            data: body
        }).then((resp) =>{
            expressResponse.status(resp.status).send(resp.data)
        }).catch((error) => {
            expressResponse.status(error.response.status).send(error.response.data)
        })
    }

    post = async (request: any, response: any) => {
        const {body} = request
        await this.requestProxy('/api/users', 'post', response, body)
    }

    // Get only allowed for myself
    get = async (request: any, response: any) => {
        const {user} = request
        if (user) {
            await this.requestProxy(`/api/users/${user.id}`, 'get', response)
        } else {
            response.status(401).send({'detail': 'Not authenticated'})
        }
    }

    // Put only allowed for myself
    put = async (request: any, response: any) => {
        const {body, user} = request
        if (user) {
            await this.requestProxy(`/api/users/${user.id}`, 'put', response, body)
        } else {
            response.status(401).send({'detail': 'Not authenticated'})
        }
    }

    login = async (request: any, response: any) => {
        const {body} = request
        await this.requestProxy('/api/auth/login', 'post', response, body)
    }

    refreshToken = async (request: any, response: any) => {
        const {body} = request
        await this.requestProxy('/api/auth/refresh', 'post', response, body)
    }
}

export default UserController
