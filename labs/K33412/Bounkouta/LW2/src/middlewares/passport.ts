import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import UserService from '../services/users/User'
import {jwtConfig} from '../configs';


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    jsonWebTokenOptions: {
        maxAge: `${jwtConfig.accessTokenLifetime}ms`
    }
}

const customJwtStrategy = new JwtStrategy(opts, async function(jwt_payload: any, next: any) {
    const userService = new UserService()
    const user = await userService.getById(jwt_payload.id)

    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
})

passport.use(customJwtStrategy)

export { opts as jwtOptions }

export default passport
