import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class TemplateModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    string_value: string

    @Column()
    number_value: number
}
