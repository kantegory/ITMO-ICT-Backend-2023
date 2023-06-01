import passport from "passport";
import { Strategy } from 'passport-http-bearer'
import axios from "axios";


const customJwtStrategy = new Strategy(async (token: any, done: any) => {
    axios.post(
        `http://localhost:8001/users/validate`,
        {'accessToken': token}
    ).then((resp) => {
        if (resp.data.valid) {
            const user = resp.data.user
            done(null, user)
        } else {
            done(null, false)
        }
    }).catch((error) => {
        done(error)
    })
})

//@ts-ignore
passport.use(customJwtStrategy)

export default passport;
