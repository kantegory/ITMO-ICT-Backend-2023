import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import AuthService from '../services/auth/Auth'



let secretKey = process.env.JWT_SECRET
secretKey ??= 'secret_key'

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
    jsonWebTokenOptions: {
        maxAge: process.env.JWT_EXPIRATION
    }
}

const customJwtStrategy = new JwtStrategy(opts, async function(jwt_payload, next) {
    const authService = new AuthService()

    const user = await authService.get(jwt_payload.id)

    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
})

passport.use(customJwtStrategy)

export { opts as jwtOptions }

export default passport