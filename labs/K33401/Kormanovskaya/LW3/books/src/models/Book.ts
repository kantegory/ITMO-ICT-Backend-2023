import {
    Entity,
    PrimaryGeneratedColumn,
    Column, OneToMany, ManyToOne,
} from "typeorm";
import {Author} from "./Author";
import {Genre} from "./Genre";
import {Reading} from "./Reading";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => Author, author => author.books)
    author: Author;

    @ManyToOne(() => Genre, genre => genre.books)
    genre: Genre;

    @OneToMany(() => Reading, reading => reading.book)
    reading: Reading[];


}
