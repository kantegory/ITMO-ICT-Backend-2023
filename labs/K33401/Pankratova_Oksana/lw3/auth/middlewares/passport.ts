import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import UserService from '../services/user'

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer') ,
    secretOrKey: 'secret',
    jsonWebTokenOptions: {
        maxAge: `3000000ms`
    }
}

const customJwtStrategy = new JwtStrategy(opts, async function(jwt_payload, next) {
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