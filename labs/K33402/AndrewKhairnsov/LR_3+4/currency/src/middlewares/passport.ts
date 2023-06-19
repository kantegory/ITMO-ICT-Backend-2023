import passport from "passport";
import {Strategy} from 'passport-http-bearer'
import axios from "axios";

//@ts-ignore
passport.use(
    new Strategy(async (token: any, done: any) => {
        axios.post(
            `http://auth:8080/users/validate`,
            {'accessToken': token}
        ).then((resp) => {
            if (resp.data.valid) {
                done(null, resp.data.user)
            } else {
                done(null, false)
            }
        }).catch((error) => {
            done(error)
        })
    })
)

export default passport;
