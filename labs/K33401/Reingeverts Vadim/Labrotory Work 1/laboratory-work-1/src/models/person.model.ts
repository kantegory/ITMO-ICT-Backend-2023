import { Table, Column, Model, HasMany } from "sequelize-typescript";

@Table
export class Person extends Model {
    @Column
    name: string;

    @Column
    age: number;

    @Column
    birthday: Date;

    @HasMany(() => Hobby)
    hobbies: Hobby[];
}

@Table
export class Hobby extends Model {}
