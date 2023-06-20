import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Book} from "./Book";

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Book, book => book.genre)
  books: Book[];
}
