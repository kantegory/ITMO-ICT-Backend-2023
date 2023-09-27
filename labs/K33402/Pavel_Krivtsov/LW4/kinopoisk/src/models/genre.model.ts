import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import {Movie} from "./movie.model";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @OneToMany(type => Movie, movie => movie.genre)
    movies: Movie[];
}
