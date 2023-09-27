import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import {Movie} from "./movie.model";

@Entity()
export class Director {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @OneToMany(type => Movie, movie => movie.director)
    movies: Movie[];
}
