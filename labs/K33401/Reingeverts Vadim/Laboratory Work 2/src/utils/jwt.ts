import jwt from "jsonwebtoken";
import crypto from "crypto";

// Usually I keep the token between 5 minutes - 15 minutes
export const generateAccessToken = (user: { id: string }) => {
    return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: "5m",
    });
};

// I choosed 8h because i prefer to make the user login again each day.
// But keep him logged in if he is using the app.
// You can change this value depending on your app logic.
// I would go for a maximum of 7 days, and make him login again after 7 days of inactivity.
export const generateRefreshToken = (user: { id: string }, jwtId: string) => {
    return jwt.sign(
        {
            userId: user.id,
            jti: jwtId,
        },
        process.env.JWT_REFRESH_SECRET!,
        {
            expiresIn: "8h",
        }
    );
};

export const generateTokens = (user: { id: string }, jwtId: string) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jwtId);

    return {
        accessToken,
        refreshToken,
    };
};

export const hashToken = (token: string) => {
    return crypto.createHash("sha512").update(token).digest("hex");
};
