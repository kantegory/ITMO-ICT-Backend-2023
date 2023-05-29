import passport from 'passport'
import {Strategy} from 'passport-http-bearer'
import axios from 'axios'



const customJwtStrategy = new Strategy(async function (token: any, done: any) {
    axios.post(
        `http://localhost:8001/validateToken`,
        {'accessToken': token}
    ).then((resp) => {
        if (resp.status == 200 && resp.data.valid) {
            const user = resp.data.user
            done(null, user)
        } else {
            done(null, false)
        }
    }).catch((error) => {
        done(error)
    })
})

passport.use(customJwtStrategy)

export default passport