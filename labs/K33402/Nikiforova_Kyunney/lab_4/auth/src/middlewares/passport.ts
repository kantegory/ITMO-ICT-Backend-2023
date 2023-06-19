import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import UserService from '../services/auth'
import passport from 'passport'

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    jsonWebTokenOptions: {
        maxAge: process.env.JWT_LIFETIME as string
    }
}

const customJwtStrategy = new JwtStrategy(opts, async function(jwt_payload, next) {
    const userService = new UserService()
    const user = await userService.getByID(jwt_payload.id)
    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
})

passport.use(customJwtStrategy)
export { opts as jwtOptions }

export default passport