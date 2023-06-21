import Deal from "../../models/deal/Deal";
import Unit from "../../models/units/Unit";
import sequelize from "../../providers/db";

class DealService {
  async getById(id: number): Promise<Deal> {
    const deal = await Deal.findByPk(id, { 
        include: [Unit],
        
        attributes: [
            'amount',
            [sequelize.literal('(Unit.price * amount)'), 'totalPrice']
        ]
    });

    if (deal) return deal;

    throw new Error("Deal not found");
  }

  async create(data: Partial<Deal>): Promise<Deal> {
    try {
      return (await Deal.create(data, {include: [Unit]})).toJSON();
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getAll() {
    return await Deal.findAll();
  }

  async totalRevenue() {
    return await sequelize.query(
      `SELECT DATE(deals.createdAt) AS Day, SUM(units.price * deals.amount) AS Revenue
      FROM deals
      JOIN units ON deals.unitId = units.id
      GROUP BY Day`
    );
  }
  
}

export default DealService;
