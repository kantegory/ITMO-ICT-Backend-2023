import { AllowNull, Column, Model, Table, Unique, ForeignKey } from 'sequelize-typescript';
import Company from '../dogs_companies/Dogs_company';

@Table
class Dogs extends Model {
	@AllowNull(false)
	@Column
	name: string;

	@AllowNull(false)
	@Column
	breed: string;

	@ForeignKey(() => Company)
	@Column
	companyId: number;
}

export default Dogs;