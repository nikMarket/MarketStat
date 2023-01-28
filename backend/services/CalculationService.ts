import db from "../db";
import { Stores, Categories, Subjects, Prices, Turnover, Calculations } from "@prisma/client"

export class CalculationService {
    public static async getStores(): Promise<Array<string>> {
        const stores: Array<Stores> = await db.stores.findMany();
        return stores.map(store => store.Store);
    }

    public static async getCategories(): Promise<Array<string>> {
        const categories: Array<Categories> = await db.categories.findMany();
        return categories.map(c => c.Category);
    }

    public static async getSubjects(store: string, category: string): Promise<Array<string>> {
        const subjects: Array<Subjects> = await db.subjects.findMany({
            where: {
                Store: store,
                Category: category
            }
        });
        return subjects.map(s => s.Subject);
    }

    public static async getPrice(subject: string): Promise<number> {
        const price: Prices = await db.prices.findUnique({
            where: {
                Subject: subject,
            }
        });
        return price.Price;
    }

    public static async getFullPrice(subject: string): Promise<number> {
        const price: Prices = await db.prices.findUnique({
            where: {
                Subject: subject,
            }
        });
        return price.FullPrice;
    }

    public static async getPrices(subject: string) {
        const price: Prices = await db.prices.findUnique({
            where: {
                Subject: subject,
            }
        });
        return {
            price: price.Price,
            fullPrice: price.FullPrice,
        };
    }

    public static async getTurnover(category: string): Promise<number> {
        const turnover: Turnover = await db.turnover.findUnique({
            where: {
                Category: category
            }
        });
        return + turnover.Turnover;
    }

    public static async getSubjectData(store: string, category: string, subject: string) {
        const subjectData: Subjects = await db.subjects.findFirst({
            where: {
                Subject: subject,
                Category: category,
                Store: store,
            }
        });
        return subjectData;
    }

    public static async getCalculations(user_id: number) {
        const calcs: Array<Calculations> = await db.calculations.findMany({
            where: {
                user_id: user_id,
            }
        });
        return calcs;
    }

    public static async addCalculation(obj) {
        return await db.calculations.create({
            data: obj,
        });
    }

    public static async updateCalculation(id, obj) {
        return await db.calculations.update({
            where: {
                id: id,
            },
            data: obj,
        })
    }

    public static async deleteCalculation(id) {
        await db.calculations.delete({
            where: {
                id: id,
            }
        })
    }
}