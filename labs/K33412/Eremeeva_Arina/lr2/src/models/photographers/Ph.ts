import { AllowNull, Column, Model, Table, Unique, ForeignKey } from 'sequelize-typescript';
import Company from '../photo_companies/Ph_company';

@Table
class Ph extends Model {
	@AllowNull(false)
	@Column
	name: string;

	@AllowNull(false)
	@Column
	surname: string;

	@ForeignKey(() => Company)
	@Column
	companyId: number;
}

export default Ph;