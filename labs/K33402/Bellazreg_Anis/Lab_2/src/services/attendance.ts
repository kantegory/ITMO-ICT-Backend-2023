import AttendanceError from "../errors/attendance/attendance"
import Attendance from "../models/attendance"


class AttendanceService {
    async getById(id: string){
        const attendance = await Attendance.findByPk(id)

        if (attendance) return attendance.toJSON()

        throw new AttendanceError('Not found!')
    }

    async create(attendance: any): Promise<Attendance|Error>{
        try {
            const data = await Attendance.create(attendance)
            return data
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new AttendanceError(errors)
        }
    }

    async listAttendances(UserId: any){
        const attendances = await Attendance.findAll({where:{UserId}})

        if (attendances) return attendances

        throw new AttendanceError('Not found!')
    }
}

export default AttendanceService