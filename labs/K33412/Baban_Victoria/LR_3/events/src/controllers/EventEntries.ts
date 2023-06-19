import EventEntryService from "../services/EventEntries"

class EventEntryController {
    private entryService: EventEntryService = new EventEntryService()

    add = async (request: any, response: any) => {
        console.log('I`m in add_service' )
        try {
            const eventEntry = request.body
            eventEntry.user_id = Number(request.headers.user)
            const result = await this.entryService.create(eventEntry)
            response.send(result)
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    delete = async (request: any, response: any) => {
        const id = request.params.id
        try {
            await this.entryService.delete(Number(id))
            response.status(200).send({ message: `Events entry with id ${id} has been deleted` })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    get = async (request: any, response: any) => {
        try {
            console.log("request.headers.user = ", request.headers.user)
            const userEvents = await this.entryService.getForUser(Number(request.headers.user))
            response.send(userEvents)
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }
}

export default EventEntryController
