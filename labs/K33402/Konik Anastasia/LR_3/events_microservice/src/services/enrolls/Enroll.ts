import UserEnrolledEvent from '../../models/userEnrolledEvents/UserEnrolledEvent'
import EnrolledEventError from "../../errors/enrolledEvents/EnrolledEvent";

class EnrollService {
    async getAll(): Promise<UserEnrolledEvent[]> {
        return await UserEnrolledEvent.findAll()
    }

    async create(enrollData: any): Promise<UserEnrolledEvent|EnrolledEventError> {
        try {
            const enroll = await UserEnrolledEvent.create(enrollData)

            return enroll.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new EnrolledEventError(errors)
        }
    }

    async delete(id: number): Promise<void> {
        const enroll: UserEnrolledEvent | null = await UserEnrolledEvent.findByPk(id)
        if (enroll == null) {
            throw new Error("No such enrolling")
        }

        return await enroll.destroy()
    }

    async getUserEnrolls(userId: number): Promise<UserEnrolledEvent[]|EnrolledEventError> {
        const enrolls = await UserEnrolledEvent.findAll({where: {userId}})

        if (enrolls) return enrolls

        throw new EnrolledEventError('User with this id not found')
    }
}

export default EnrollService
