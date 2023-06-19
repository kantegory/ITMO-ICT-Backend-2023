interface Sale {
    quantity: number;
    price: number;
    productId: number;
    dateOfSale: string;
}

interface GroupedSalesByDate {
    [dateOfSale: string]: number;
}

class StatController {
    getAmountStat = async (request: any, response: any) => {
        try {
            const productIdFilter = request.query['product-id']
                ? `?product-id=${request.query['product-id']}`
                : '';

            const salesResponse = await fetch(
                `http://${process.env.MAIN_HOST}:${process.env.MAIN_PORT}/v1/sales/sale${productIdFilter}`
            );
            const sales = await salesResponse.json() as Array<Sale>;
            const groupedSalesByDate = sales.reduce((groupedSales, sale) => {
                if (!(sale.dateOfSale in groupedSales)) {
                    return {
                        ...groupedSales,
                        [sale.dateOfSale]: sale.quantity
                    }
                } else {
                    return {
                        ...groupedSales,
                        [sale.dateOfSale]: groupedSales[sale.dateOfSale] + sale.quantity
                    }
                }
            }, {} as GroupedSalesByDate);

            const salesStat = Object.entries(groupedSalesByDate).map(([dateOfSale, quantity]) => ({
                dateOfSale,
                quantity,
            }));

            salesStat.sort((a, b) => a.dateOfSale.localeCompare(b.dateOfSale));
            response.send(salesStat)
        } catch (error: any) {
            response.status(500).send({ "error": error.message })
        }
    }

    getRevenueStat = async (request: any, response: any) => {
        try {
            const productIdFilter = request.query['product-id']
                ? `?product-id=${request.query['product-id']}`
                : '';

            const salesResponse = await fetch(`http://${process.env.MAIN_HOST}:${process.env.MAIN_PORT}/v1/sales/sale${productIdFilter}`);
            const sales = await salesResponse.json() as Array<Sale>;
            const groupedSalesByDate = sales.reduce((groupedSales, sale) => {
                if (!(sale.dateOfSale in groupedSales)) {
                    return {
                        ...groupedSales,
                        [sale.dateOfSale]: sale.price
                    }
                } else {
                    return {
                        ...groupedSales,
                        [sale.dateOfSale]: groupedSales[sale.dateOfSale] + sale.price
                    }
                }
            }, {} as GroupedSalesByDate);

            const salesStat = Object.entries(groupedSalesByDate).map(([dateOfSale, revenue]) => ({
                dateOfSale,
                revenue,
            }));

            salesStat.sort((a, b) => a.dateOfSale.localeCompare(b.dateOfSale));
            response.send(salesStat)
        } catch (error: any) {
            response.status(500).send({ "error": error.message })
        }
    }
}

export default StatController