import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique} from 'typeorm'
import {Movie} from "./movie.model";

@Unique('movie_user_constraint', ["movie", "username"])
@Entity()
export class Watchlist {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: true,
    })
    rate: number;

    @ManyToOne(() => Movie, (movie) => movie.watchlist)
    movie: Movie;

    @Column()
    username: string;
}
