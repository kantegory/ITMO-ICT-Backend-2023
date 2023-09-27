import 'dotenv/config'

export const getUsername = async (request: any) => {
    console.log(`${process.env.AUTH}/me`)
    const response = await fetch(`${process.env.AUTH}/me`, {
        headers: {
            auth: request.headers.auth
        }
    })
    if (response.status == 200){
        const responseJSON = await response.json()
        return responseJSON['username']
    }
    throw new Error("Unauthorized")
}