import {
    Entity,
    PrimaryGeneratedColumn,
    Column, ManyToOne
} from "typeorm";
import {Book} from "./Book";

@Entity()
export class Reading {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    review: string;

    @Column({
        nullable: true,
    })
    rate: number;

    @ManyToOne(() => Book, (book) => book.reading)
    book: Book;

    @Column()
    username: string;
}