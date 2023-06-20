import {
    Entity,
    PrimaryGeneratedColumn,
    Column, OneToMany,
} from "typeorm";
import * as bcrypt from "bcryptjs";

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


    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
