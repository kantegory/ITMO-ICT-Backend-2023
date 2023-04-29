import { hashToken } from "~/utils/jwt";
import BaseService from "~/services/BaseService";

class UserService extends BaseService {
    // used when we create a refresh token.
    addRefreshTokenToWhitelist({
        jwtId,
        refreshToken,
        userId,
    }: {
        jwtId: string;
        refreshToken: string;
        userId: string;
    }) {
        return this.db.refreshToken.create({
            data: {
                id: jwtId,
                hashedToken: hashToken(refreshToken),
                userId,
            },
        });
    }

    // used to check if the token sent by the client is in the database.
    findRefreshTokenById(id: string) {
        return this.db.refreshToken.findUnique({
            where: {
                id,
            },
        });
    }

    // soft delete tokens after usage.
    deleteRefreshToken(id: string) {
        return this.db.refreshToken.update({
            where: {
                id,
            },
            data: {
                revoked: true,
            },
        });
    }

    revokeTokens(userId: string) {
        return this.db.refreshToken.updateMany({
            where: {
                userId,
            },
            data: {
                revoked: true,
            },
        });
    }
}

export default UserService;
