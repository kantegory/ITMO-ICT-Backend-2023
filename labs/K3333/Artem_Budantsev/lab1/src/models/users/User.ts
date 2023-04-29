import { Table, Column, Model, Unique, AllowNull } from 'sequelize-typescript'

@Table
class User extends Model {
    @Unique
    @Column
    login!: string; 

    @AllowNull(false)
    @Column
    email!: string; 

    @AllowNull(false)
    @Column
    firstName!: string;

    @Column
    lastName!: string; 
    
    @Column
    phone!: string;  
}

export default User