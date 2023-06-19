class ProcessData {
    static async processSell(sellData: any, good: any) {
        try {
            sellData.price = good.price * sellData.count
            sellData.goodId = good.id 

            if ('name' in sellData) delete sellData['name']

            return sellData 
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
    }
}

export default ProcessData