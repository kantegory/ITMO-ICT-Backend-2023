import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserService from '../services/userService';
import dotenv from "dotenv";

dotenv.config();

/**
 * This module configures Passport.js for JWT (JSON Web Token) authentication.
 */

// Options for JWT authentication strategy.
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret', // Replace with your actual secret key
    jsonWebTokenOptions: {
        maxAge: `${process.env.ACCESS_TOKEN_LIFETIME}ms`
    }
};

// Create a custom JWT strategy for Passport.js.
const customJwtStrategy = new JwtStrategy(opts, async function (jwt_payload, next) {
    const userService = new UserService();
    const user = await userService.getById(jwt_payload.id);

    if (user) {
        next(null, user); // Successful authentication
    } else {
        next(null, false); // Authentication failed
    }
});

// Use the custom JWT strategy with Passport.js.
passport.use(customJwtStrategy);

export { opts as jwtOptions };

export default passport;
