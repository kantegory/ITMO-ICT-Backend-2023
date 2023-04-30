import { User, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import DbService from "~/services/DbService";

class UserService extends DbService {
    private saltRounds = 8;

    exclude<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
        const omitedUser = { ...user };
        for (let key of keys) {
            delete omitedUser[key];
        }
        return omitedUser;
    }

    excludeMany<User, Key extends keyof User>(users: User[], keys: Key[]): Omit<User, Key>[] {
        const omitedUsers = users.map((user) => this.exclude(user, keys));
        return omitedUsers;
    }

    async getAll(): Promise<User[]> {
        return this.db.user.findMany();
    }

    async getById(id: User["id"]): Promise<User | null> {
        return this.db.user.findUnique({
            where: {
                id,
            },
        });
    }

    async getByEmail(email: User["email"]): Promise<User | null> {
        return this.db.user.findUnique({
            where: {
                email,
            },
        });
    }

    async create(userData: Prisma.UserUncheckedCreateInput): Promise<User> {
        const { password } = userData;

        if (password) {
            const hashedPassword = await this.hashPassword(password);
            userData.password = hashedPassword;

            return this.db.user.create({
                data: userData,
            });
        } else throw new Error("Password field was not provided");
    }

    async update(id: User["id"], userData: Prisma.UserUncheckedUpdateInput): Promise<User> {
        const { password } = userData;

        if (typeof password === "string") {
            const hashedPassword = await this.hashPassword(password);
            userData.password = hashedPassword;
        }
        userData.updatedAt = new Date().toJSON();

        return this.db.user.update({
            where: {
                id,
            },
            data: userData,
        });
    }

    async delete(id: User["id"]): Promise<User> {
        return this.db.user.delete({
            where: {
                id,
            },
        });
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(String(password), this.saltRounds);
    }

    async comparePasswordByUser(user: User, password: string): Promise<boolean> {
        if (!user) return false;
        return bcrypt.compare(password, user.password);
    }

    async comparePasswordById(id: User["id"], password: string): Promise<boolean> {
        const user = await this.getById(id);
        if (!user) return false;

        return await this.comparePasswordByUser(user, password);
    }
}

export default UserService;
