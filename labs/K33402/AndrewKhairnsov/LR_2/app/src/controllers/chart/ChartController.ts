import ChartService from "../../services/chart/ChartService";

class ChartController {
    private chartService: ChartService;

    constructor() {
        this.chartService = new ChartService();
    }

    getChartData = async (request: any, response: any) => {
        try {
            const {currencyId, days} = request.body;
            const chart = await this.chartService.getChartData(currencyId, days);
            return response.status(200).send(chart);
        } catch (error: any) {
            response.status(500).send({"error": error.message})
        }
    }
}

export default ChartController;