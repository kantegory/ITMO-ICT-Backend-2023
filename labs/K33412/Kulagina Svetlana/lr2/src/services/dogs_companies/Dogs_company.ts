import Company from '../../models/dogs_companies/Dogs_company';
import sequelize from '../../providers/db';

const companiesRepository = sequelize.getRepository(Company);

class CompaniesService {
    async get(id: number): Promise<Company> {
        const company = await companiesRepository.findOne({ where: { 'id': id } });
        if (company) return company
        throw new Error(`Company with id ${id} not found`);
    }

    async create(companyData: Partial<Company>): Promise<Company> {
        try {
            const company = await companiesRepository.create(companyData);
            return company.toJSON();
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message);
            throw console.log(errors);
        }
    }

    async update(id: number, companyData: Partial<Company>): Promise<Company> {
        try {
            const company = await companiesRepository.findOne({ where: { id } });

            if (company) {
                await company.update(companyData);
                return company.toJSON();
            }
            throw new Error(`Worker with id ${id} not found`);
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message);
            throw console.log(errors);
        }
    }

    async delete(id: number): Promise<void> {
        const company = await companiesRepository.findOne({ where: { id } });
        if (company) {
            await company.destroy();
            return;
        }
        throw new Error(`Company with id ${id} not found`);
    }
    
		async getByOwner(id: string): Promise<any> {
			const company = await companiesRepository.findAll({ where: { 'owner_surname': id } });
			if (company) return company
			throw new Error(`${id}'s companies not found`);
	}
}

export default CompaniesService;
