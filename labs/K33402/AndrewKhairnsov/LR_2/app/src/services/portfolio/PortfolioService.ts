import Portfolio from "../../models/portfolio/Portfolio";
import sequelize from "../../providers/db";

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
            throw  new Error(`Failed to load portfolio of user with id = ${userId} :/`)
        }
    }

    async buyCurrency(userId: number, currencyId: string, amount: number) {
        const t = await sequelize.transaction();

        try {
            let currency = await Portfolio.findOne({
                where: {
                    userId: userId,
                    currencyId: currencyId,
                },
                lock: true,
                transaction: t
            });

            if (currency) {
                currency.amount += amount;
                await currency.save();
            } else {
                currency = await Portfolio.create({
                    userId: userId,
                    currencyId: currencyId,
                    amount: amount
                }, { transaction: t })
            }
            return currency;
        } catch (e: any) {
            await t.rollback()
            throw new Error('Failed to buy currency :(')
        }
    }

    async sellCurrency(userId: number, currencyId: string, amount: number) {
        const t = await sequelize.transaction();

        try {
            // for update lock in transaction
            const currency = await Portfolio.findOne({ where: { userId: userId, currencyId: currencyId }, lock: true, transaction: t });

            if (currency) {
                if (amount < currency.amount) {
                    currency.amount -= amount;
                    await currency.save();
                    return currency;
                } else if (amount == currency.amount) {
                    await currency.destroy();
                    return null;
                } else {
                    throw new Error("Can't sell because amount is > than you have. Do you want to sell more than you have? Crazy");
                }
            } else {
                throw new Error('Currency not found. You can not sell currency that you do not have. Stop it');
            }


        } catch (e: any) {
            await t.rollback();
            throw new Error('Failed to sell currency. Contact with support team. They will help you :/')
        }
    }
}

export default PortfolioService;