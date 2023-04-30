import { hashToken } from "~/utils";
import BaseService from "~/services/BaseService";

class UserService extends BaseService {
    // Creates token entry for user in db
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

    // Checks if the token sent by the client is in the database.
    getRefreshTokenById(id: string) {
        return this.db.refreshToken.findUnique({
            where: {
                id,
            },
        });
    }

    // Soft deletes tokens after usage
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

    // Called in case, where there is a need to invalidate all of the tokens (e.g.: password reset)
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
