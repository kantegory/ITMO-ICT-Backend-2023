import { AllowNull, Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
class Company extends Model {
	@AllowNull(false)
	@Unique
	@Column
	company_name: string;

	@AllowNull(false)
	@Column
	year: string;

	@AllowNull(false)
	@Column
	owner_name: string;

	@AllowNull(false)
	@Column
	owner_surname: string;
}

export default Company;