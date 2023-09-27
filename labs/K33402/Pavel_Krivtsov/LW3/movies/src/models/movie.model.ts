import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BeforeInsert, Unique, BeforeUpdate} from 'typeorm'
import {Genre} from "./genre.model";
import {Director} from "./director.model";
import {Watchlist} from "./watchlist.model";
import {MovieError} from "../errors/movie.error";

@Entity()
@Unique('title_year_director', ["title", "year", "director"])
export class Movie {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column('int')
    year: number

    @ManyToOne(type => Genre, genre => genre.movies)
    genre: Genre;

    @ManyToOne(type => Director, director => director.movies)
    director: Director;

    @OneToMany(() => Watchlist, watchlist => watchlist.movie)
    watchlist: Watchlist[];

    @BeforeInsert()
    @BeforeUpdate()
    checkYear() {
        const today = new Date()
        if (this.year > today.getFullYear() + 100 || this.year < 1888)
            throw new MovieError('Wrong movie year!')
    }

}
