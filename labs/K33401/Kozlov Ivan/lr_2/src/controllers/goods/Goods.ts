import GoodsService from '../../services/goods/Goods'
import RefreshTokenService from '../../services/auth/RefreshToken'

class GoodsController {
    private goodsService: GoodsService

    constructor() {
        this.goodsService = new GoodsService()
    }

    get = async (request: any, response: any) => {
        try {
            const goods = await this.goodsService.getById(
                Number(request.params.id)
            )

            response.send(goods)
        } catch (error: any) {
            response.status(404).send({ "error": "error" })
        }
    }

    create = async (request: any, response: any) => {
        const { body } = request

        try {
            const goods = await this.goodsService.create(body)

            response.status(200).send(goods)
        } catch (error: any) {
            response.status(400).send({ "error": "error" })
        }
    }

    update = async (request: any, response: any) => {
        const refreshToken = request.headers["refreshtoken"];
        if (!refreshToken) {
            response.status(400).send({ "error": "Missing refreshToken header" });
            return;
        }
        const refreshTokenService = new RefreshTokenService();
        const { userId, isExpired } = await refreshTokenService.isRefreshTokenExpired(refreshToken);
        if(isExpired){
            response.status(401).send({ "error": "Unauthorized, u need new refreshToken" });
            return;
        }

        const { body } = request

        const id = Number(request.params.id)

        try {
            const goods = await this.goodsService.update(id, body)

            response.send(goods)
        } catch (error: any) {
            response.status(400).send({ "error": "error" })
        }
    }

    delete = async (request: any, response: any) => {
        const refreshToken = request.headers["refreshtoken"];
        if (!refreshToken) {
            response.status(400).send({ "error": "Missing refreshToken header" });
            return;
        }
        const refreshTokenService = new RefreshTokenService();
        const { userId, isExpired } = await refreshTokenService.isRefreshTokenExpired(refreshToken);
        if(isExpired){
            response.status(401).send({ "error": "Unauthorized, u need new refreshToken" });
            return;
        }

        const id = Number(request.params.id)

        try {
            await this.goodsService.delete(id)

            response.status(200).send({ message: `Goods with id ${id} has been deleted` })
        } catch (error: any) {
            response.status(400).send({ "error": "error" })
        }
    }

    getCountGoods = async (request: any, response: any) => {
        try {
            const goods = await this.goodsService.getCountGoods()
            response.send(goods)
        } catch (error: any) {
            response.status(404).send({ "error": "error" })
        }
    }
}

export default GoodsController
