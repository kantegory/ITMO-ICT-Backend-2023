import {Request, Response} from "express";
import ReadingService from "../services/Reading";

const readingService = new ReadingService();

class ReadingController {
    getAll = async (request: Request, response: Response) => {
        const allReadings = await readingService.getAll();
        return response.send(allReadings);
    };

    create = async (request: Request, response: Response) => {
        const usernamedata = await fetch(process.env.AUTH_HOST + 'me', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'auth': request.headers['authorization']
            },
        })
        if (usernamedata['status'] != 200) {
            return response.status(usernamedata['status']).send(
                {
                    error: usernamedata['statusText']
                }
            )
        }
        const usernameJSON = await usernamedata.json();
        const username = await String(usernameJSON['username'])
        const {bookId, review, rate} = request.body;
        const results = await readingService.create(bookId, username, review, rate);
        return response.send(results);
        return response.send("oi");
    };

    update = async (request: Request, response: Response) => {
        const usernamedata = await fetch(process.env.AUTH_HOST + 'me', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'auth': request.headers['authorization']
            },
        })
        if (usernamedata['status'] != 200) {
            return response.status(usernamedata['status']).send(
                {
                    error: usernamedata['statusText']
                }
            )
        }
        const usernameJSON = await usernamedata.json();
        const username = await String(usernameJSON['username'])
        const id = Number(request.params.id);
        const {review, rate} = request.body;
        const results = await readingService.update(username, id, review, rate);
        return response.send(results);
    };

    delete = async (request: Request, response: Response) => {
        const usernamedata = await fetch(process.env.AUTH_HOST + 'me', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'auth': request.headers['authorization']
            },
        })
        if (usernamedata['status'] != 200) {
            return response.status(usernamedata['status']).send(
                {
                    error: usernamedata['statusText']
                }
            )
        }
        const usernameJSON = await usernamedata.json();
        const username = await String(usernameJSON['username'])
        const id = Number(request.params.id);
        const results = await readingService.delete(username, id);
        return response.send(results);
    };
}

export default ReadingController;