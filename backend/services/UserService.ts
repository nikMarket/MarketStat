import db from "../db"
import { User } from "@prisma/client"

const bcrypt = require("bcrypt")

export default class UserService {
    public static async registerUser(firstName: string, secondName: string, email: string, password: string): Promise<User> {
        return await db.user.create({
            data: {
                first_name: firstName,
                second_name: secondName,
                email: email,
                password_hash: await bcrypt.hash(password, 10),
                auth_token: await bcrypt.hash(email, 10),
            },
        });
    }

    public static async isEmailVacant(email: string): Promise<boolean> {
        return await db.user.findUnique({
            where: {
                email: email,
            }
        }) === null;
    }

    public static async getUserByAuthToken(auth_token: string): Promise<User | null> {
        return await db.user.findUnique({
            where: {
                auth_token: auth_token,
            }
        });
    }

    public static async getUserByEmail(email: string): Promise<User | null> {
        return await db.user.findUnique({
            where: {
                email: email
            }
        });
    }

    public static async getAuthToken(email: string, password: string): Promise<string | null> {
        const user: User | null = await this.getUserByEmail(email);
        if (user === null) return null;
        if (await bcrypt.compare(password, user.password_hash)) {
            return user.auth_token;
        }
        return null;
    }
}