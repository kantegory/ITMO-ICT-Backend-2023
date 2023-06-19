import UserService from "../services/user/UserService"

export const passport = require('passport')
const passportJwt = require('passport-jwt')
const secretKey = "secretKey"

let ExtractJwt = passportJwt.ExtractJwt
let JwtStrategy = passportJwt.Strategy

export const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
}

let strategy = new JwtStrategy(options, async function(jwt_payload: any, next: any) {
  const service = new UserService()
  let user = await service.getById(jwt_payload.id)

  if (user) {
    next(null, user)
  } else {
    next(null, false)
  }
})
passport.use(strategy)