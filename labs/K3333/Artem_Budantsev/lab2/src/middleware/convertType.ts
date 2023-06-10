class ConvertType {
    static async convertInt(data: any,params: any) {
        try {
            for(const key of Object.keys(params)) 
                data[key] = typeof data[key] == 'string' ? Number(data[key]) : data[key]

            return data
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
    }
}

export default ConvertType