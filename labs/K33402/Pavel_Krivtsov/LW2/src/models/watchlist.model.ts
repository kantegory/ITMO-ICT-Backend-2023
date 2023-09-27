import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique} from 'typeorm'
import {Movie} from "./movie.model";
import {User} from "./user.model";

@Unique('movie_user_constraint', ["movie", "user"])
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

    @ManyToOne(() => User, (user) => user.watchlist)
    user: User;
}
