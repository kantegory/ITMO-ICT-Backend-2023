import { v4 as uuidv4 } from "uuid"
import AttendanceService from "../services/attendance"

class AttendanceController {
    private attendanceService: AttendanceService

    constructor() {
        this.attendanceService = new AttendanceService()
    }

    get = async (request: any, response: any) => {
        try {
            const records = await this.attendanceService.listAttendances(request.user.id)
            return response.json(records);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    post = async (request: any, response: any) => {
        const id = uuidv4()
        try {
            const record = await this.attendanceService.create({ ...request.body, id})
            return response.json({ record, msg: 'Successfully attend this event' })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }     
}

export default AttendanceController
