import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import hashPassword from "../utils/hashPassword"

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: "varchar", length: 20 })
  name: string;

  @Column({ type: "varchar", length: 20 })
  surname: string;

  @Column({ type: "varchar", length: 20, unique: true })
  phone: string;

  @Column({ type: "varchar", length: 20, nullable: true, unique: true })
  email: string;

  @Column({ type: "varchar", length: 50 })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hashPassword(this.password);
    }
  }
}