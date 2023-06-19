import Portfolio from "../../models/portfolio/Portfolio";

class PortfolioService {
    async getByUserId(userId: string) {
        try {
            const portfolio = await Portfolio.findAll({
                where: {
                    userId: userId,
                }
            })
            if (portfolio) return portfolio;
        } catch (e: any) {
            throw  new Error(`Failed to load portfolio of user with id = ${userId}`)
        }
    }

    async buyCurrency(userId: number, currencyId: string, amount: number) {
        try {
            let currency = await Portfolio.findOne({
                where: {
                    userId: userId,
                    currencyId: currencyId,
                }
            });

            if (currency) {
                currency.amount += amount;
                await currency.save();
            } else {
                currency = await Portfolio.create({
                    userId: userId,
                    currencyId: currencyId,
                    amount: amount
                })
            }
            return currency;
        } catch (e: any) {
            throw new Error('Failed to buy currency')
        }
    }

    async sellCurrency(userId: number, currencyId: string, amount: number) {
        try {
            const currency = await Portfolio.findOne({
                where: {
                    userId: userId,
                    currencyId: currencyId,
                }
            });

            if (currency) {
                if (amount < currency.amount) {
                    currency.amount -= amount;
                    await currency.save();
                    return currency;
                } else if (amount == currency.amount) {
                    await currency.destroy();
                    return null;
                } else {
                    throw new Error("Can't sell because amount is > than you have")
                }
            } else {
                throw new Error('Currency not found')
            }


        } catch (e: any) {
            throw new Error('Failed to sell currency')
        }
    }
}

export default PortfolioService;