import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class RandomEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    randomProperty: string
}
