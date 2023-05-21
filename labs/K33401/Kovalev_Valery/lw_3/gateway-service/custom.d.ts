type User = {
    id: string | number
    name?: string
    email: string
    password:string
}

declare namespace Express {
    export interface Request {
        user?: User;
    }

    export interface Response {
        locals: {
            user?:User;
        }
    }
}