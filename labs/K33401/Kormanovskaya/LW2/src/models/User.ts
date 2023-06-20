import {
    Entity,
    PrimaryGeneratedColumn,
    Column, OneToMany,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import {Reading} from "./Reading";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    tokenVersion: number;

    @OneToMany(() => Reading, reading => reading.user)
    reading: Reading[]

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
