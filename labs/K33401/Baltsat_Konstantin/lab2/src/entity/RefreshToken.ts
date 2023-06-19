import {Entity, PrimaryColumn, OneToOne, JoinColumn} from "typeorm"
import {User} from "./User";

@Entity("refresh_token")
export class RefreshToken {
    @PrimaryColumn()
    token: string

    @OneToOne(() => User, {
        cascade: true,
        onDelete: "CASCADE"
    })
    @JoinColumn()
    user: User
}