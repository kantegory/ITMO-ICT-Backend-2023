import RefreshTokenService from '../../services/auth/RefreshToken';
import WorkersService from '../../services/workers/Workers';

class WorkersController {
    private workersService: WorkersService;

    constructor() {
        this.workersService = new WorkersService();
    }

    get = async (request: any, response: any) => {
        try {
            const worker = await this.workersService.get(
                Number(request.params.id)
            );

            response.send(worker);
        } catch (error: any) {
            response.status(404).send({ "error": "error" });
        }
    };

    create = async (request: any, response: any) => {
        const { body } = request;

        try {
            const worker = await this.workersService.create(body);

            response.status(200).send(worker);
        } catch (error: any) {
            response.status(400).send({ "error": "error" });
        }
    };

    update = async (request: any, response: any) => {
        const refreshToken = request.headers["refreshtoken"];
        if (!refreshToken) {
            response.status(400).send({ "error": "Missing refreshToken header" });
            return;
        }
        const refreshTokenService = new RefreshTokenService();
        const { userId, isExpired } = await refreshTokenService.isRefreshTokenExpired(refreshToken);
        if (isExpired) {
            response.status(401).send({ "error": "Unauthorized, u need new refreshToken" });
            return;
        }

        const { body } = request;

        const id = Number(request.params.id);

        try {
            const worker = await this.workersService.update(id, body);

            response.send(worker);
        } catch (error: any) {
            response.status(400).send({ "error": "error" });
        }
    };

    delete = async (request: any, response: any) => {
        const refreshToken = request.headers["refreshtoken"];
        if (!refreshToken) {
            response.status(400).send({ "error": "Missing refreshToken header" });
            return;
        }
        const refreshTokenService = new RefreshTokenService();
        const { userId, isExpired } = await refreshTokenService.isRefreshTokenExpired(refreshToken);
        if (isExpired) {
            response.status(401).send({ "error": "Unauthorized, u need new refreshToken" });
            return;
        }

        const id = Number(request.params.id);

        try {
            await this.workersService.delete(id);

            response.status(200).send({ message: `Worker with id ${id} has been deleted` });
        } catch (error: any) {
            response.status(400).send({ "error": "error" });

        }
    }
}

export default WorkersController;