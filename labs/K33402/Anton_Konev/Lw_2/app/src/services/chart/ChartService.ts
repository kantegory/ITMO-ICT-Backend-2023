import axios from "axios";
import ChartError from "../../errors/chart/ChartError";

class ChartService {
    async getChartData(id: string, days: number) {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=rub&days=${days-1}&interval=daily`);
            const {prices} = response.data;
            if (prices) return prices;
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new ChartError(errors)
        }
    }
}

export default ChartService;