import EventEntryService from "../services/EventEntries"

class EventEntryController {
    private entryService: EventEntryService = new EventEntryService()

    add = async (request: any, response: any) => {
        try {
            const eventEntry = request.body
            eventEntry.user_id = request.user.id
            const result = await this.entryService.create(eventEntry)
            response.send({ id: result.id })
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
            const userEvents = await this.entryService.getForUser(request.user.id)
            response.send(userEvents)
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }
}

export default EventEntryController
