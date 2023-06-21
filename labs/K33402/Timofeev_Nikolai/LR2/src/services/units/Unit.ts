// @ts-nocheck
import Unit from "../../models/units/Unit";
import Warehouse from "../../models/warehouses/Warehouse";
import sequelize from "../../providers/db";

class UnitService {
  async getById(id: number): Promise<Unit> {
    const unit = await Unit.findByPk(id, { include: [Warehouse] });

    if (unit) return unit.toJSON();

    throw new Error("Unit not found");
  }

  async create(data: Partial<Unit>): Promise<Unit> {
    try {
      return (await Unit.create(data)).toJSON();
    } catch (e: any) {
      throw new Error(e.errors.map((error: any) => error.message));
    }
  }

  async search(query: string) {
    try {
      if (typeof query !== "string") {
        throw new Error("Query must be a string");
      }

      return await sequelize.query(`SELECT * FROM "units" WHERE title LIKE '%${query}%'`);
    } catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  }

  async getAll() {
    return await Unit.findAll();
  }

  async stockGraph() {
    const warehouseMap = new Map<number, Object>();

    (
      await Unit.findAll({
        attributes: ["title", "stockAmount", "warehouseId"],
        group: "warehouseId",
      })
    ).forEach((item) => {
      warehouseMap.set(item.warehouseId, { title: item.title, stockAmount: item.stockAmount });
    });

    return Object.fromEntries(warehouseMap);
  }
}

export default UnitService;
