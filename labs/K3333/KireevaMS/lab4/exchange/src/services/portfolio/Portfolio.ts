import Portfolio from "../../models/portfolio/Portfolio";
import PortfolioError from "../../errors/portfolio/Portfolio";

class PortfolioService {
    async buyCurrency(userId: number, currencyId: number, amount: number) {
        try {
            let existingCurrency = await Portfolio.findOne({
                where: {
                    userId: userId,
                    currencyId: currencyId,
                },
            });

            if (existingCurrency) {
                existingCurrency.sum = +existingCurrency.sum + +amount;
                await existingCurrency.save();
            } else {
                existingCurrency = await Portfolio.create({
                    userId: userId,
                    currencyId: currencyId,
                    sum: amount,
                });
            }

            return existingCurrency.toJSON();
        } catch (error) {
            throw new Error('Failed to buy currency.');
        }
    }

    async getAll() {
        const portfolio = await Portfolio.findAll()

        if (portfolio) return portfolio

        throw new PortfolioError('Currencies are not found')
    }

    ByUser = async (userId: string): Promise<Portfolio[]> => {
        try {
            const currencies = await Portfolio.findAll({
                where: {
                    userId: userId,
                },
            });
            return currencies;
        } catch (error) {
            throw new Error('Failed to open the portfolio.');
        }
    };

    oneByUser = async (userId: string, currencyId: string): Promise<Portfolio | null> => {
        try {
            const currency = await Portfolio.findOne({
                where: {
                    userId: userId,
                    currencyId: currencyId,
                },
            });

            if (!currency) {
                throw new Error('Currency not found.');
            }

            return currency;
        } catch (error) {
            throw new Error('Failed to find currency.');
        }
    };


    sell = async (userId: string, currencyId: string, amount: number): Promise<null> => {
        try {
            const currency = await Portfolio.findOne({
                where: {
                    userId: userId,
                    currencyId: currencyId,
                },
            });

            if (currency) {
                const newSum = currency.sum - amount;

                if (newSum > 0) {
                    currency.sum = newSum;
                    await currency.save();
                    return currency.toJSON();

                } else {
                    await currency.destroy();
                    return null
                }
            } else {
                throw new Error('Currency not found.');
            }

        } catch (error) {
            throw new Error('Failed to sell currency.');
        }
    };
}

export default PortfolioService