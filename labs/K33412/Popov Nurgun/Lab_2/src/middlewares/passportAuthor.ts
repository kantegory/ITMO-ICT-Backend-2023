import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import AuthorService from "../services/authors/Author";
import passportAuthor from "passport";

const optsAuthor = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    jsonWebTokenOptions: {
        maxAge: process.env.JWT_LIFETIME as string
    }
}

const customJwtStrategyAuthor = new JwtStrategy(optsAuthor, async function(jwt_payload, next) {
    const authorService = new AuthorService()
    const user = await authorService.getByID(jwt_payload.id)
    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
})

passportAuthor.use(customJwtStrategyAuthor)
export { optsAuthor as jwtOptionsAuthor }

export default passportAuthor