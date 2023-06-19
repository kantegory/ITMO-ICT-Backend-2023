import Staff from '../../models/staffs/Staff'

class StaffService {
    async getById(id: number) {
        const staff = await Staff.findByPk(id)

        if (staff) return staff.toJSON()

    }

    async get() {
        const staffs = await Staff.findAll();

        if (staffs) return staffs 
    }

    async create(staffData: any) {
        try {
            const staff = await Staff.create(staffData)

            return staff.toJSON()
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
    }

    async update(id: number, staffData: any) {
        try {
            const staff = await Staff.findByPk(id)

            if (staff) {
                console.log(staffData)

                const updateStaff = await staff.update(staffData)   

                return updateStaff.toJSON()
            }
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
        
    }

    async delete(id: number) {
        try {
            const staff = await Staff.findByPk(id)

            if (staff) {
                const deletedStaff = await staff.destroy({where: {id: id}})

                return deletedStaff
            }
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }    
    }
}

export default StaffService