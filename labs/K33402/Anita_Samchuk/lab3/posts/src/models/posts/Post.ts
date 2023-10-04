import {
    Table,
    Column,
    Model,
    HasMany,
    Default,
    UpdatedAt,
    CreatedAt,
    AllowNull
} from 'sequelize-typescript';
import Comment from "../comments/Comment";

export enum Language {
    none = "None",
    c = "C",
    cPlus = "C++",
    cSharp = "C#",
    python = "Python",
    swift = "Swift",
    kotlin = "Kotlin",
    js = "JavaScript",
    ts = "TypeScript",
    java = "Java",
    go = "Go",
    ruby = "Ruby",
    rust = "Rust"
}

@Table
class Post extends Model {
    @Default("No title")
    @Column
    title!: string

    @AllowNull(false)
    @Column
    body!: string

    @Default(Language.none)
    @Column
    language!: Language

    @UpdatedAt
    updatedOn!: Date;

    @CreatedAt
    creationDate!: Date

    @AllowNull(false)
    @Column
    userId!: number;

    @HasMany(() => Comment, {onDelete: 'CASCADE'})
    comments!: Comment[];
}

export default Post