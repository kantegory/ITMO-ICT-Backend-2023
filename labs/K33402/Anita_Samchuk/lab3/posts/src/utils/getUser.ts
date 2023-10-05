import 'dotenv/config'

export const getUser = async (token?: string) => {
    if (token) {
        const user = await fetch(
            `${process.env.USERAPI}/account`,
            {
                headers: {authorization: token}
            })
        if (user.status == 200) {
            const userjson = await user.json()
            return userjson.id
        } else {
            throw new Error("Unauthorized")
        }
    }
    throw new Error("Unauthorized")
}