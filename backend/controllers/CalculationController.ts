import {NextApiRequest, NextApiResponse} from "next";
import {CalculationService} from "../services/CalculationService";
import DefaultController from "./DefaultController";

export default class CalculationController {
    public static async getStores(req: NextApiRequest, res: NextApiResponse){
        let {method} = req;
        if (method !== "GET") return res.status(404).json({});
        const stores = await CalculationService.getStores();
        return res.status(200).json(stores);
    }

    public static async getSubjects(req: NextApiRequest, res: NextApiResponse){
        let {query: {store, category}, method} = req;
        if (method !== "GET") return res.status(404).json({});
        store = DefaultController.validateMultiData(store);
        category = DefaultController.validateMultiData(category);
        const subjects = await CalculationService.getSubjects(store, category);
        return res.status(200).json(subjects);
    }

    public static async getCategories(req: NextApiRequest, res: NextApiResponse){
        let {method} = req;
        if (method !== "GET") return res.status(404).json({});
        const categories = await CalculationService.getCategories();
        return res.status(200).json(categories);
    }

    public static async getTurnover(req: NextApiRequest, res: NextApiResponse){
        let {query: {category}, method} = req;
        if (method !== "GET") return res.status(404).json({});
        category = DefaultController.validateMultiData(category);
        const turnover = await CalculationService.getTurnover(category);
        return res.status(200).json({turnover: turnover});
    }

    public static async getSubjectData(req: NextApiRequest, res: NextApiResponse){
        let {query: {category, subject, store}, method} = req;
        if (method !== "GET") return res.status(404).json({});
        category = DefaultController.validateMultiData(category);
        store = DefaultController.validateMultiData(store);
        subject = DefaultController.validateMultiData(subject);
        const subjectData = await CalculationService.getSubjectData(store, category, subject);
        return res.status(200).json(subjectData);
    }

    public static async getPrices(req: NextApiRequest, res: NextApiResponse){
        let {query: {subject}, method} = req;
        if (method !== "GET") return res.status(404).json({});
        subject = DefaultController.validateMultiData(subject);
        const prices = await CalculationService.getPrices(subject);
        return res.status(200).json(prices);
    }

    public static async getCalculations(req: NextApiRequest, res: NextApiResponse){
        let {query: {user_id}, method} = req;
        if (method !== "GET") return res.status(404).json({});
        user_id = DefaultController.validateMultiData(user_id);
        const userId = parseInt(user_id);
        const calculations = await CalculationService.getCalculations(userId);
        return res.status(200).json(calculations);
    }

    public static async addCalculation(req: NextApiRequest, res: NextApiResponse){
        let {method, query: {user_id, Store, Category, Subject, Name, Brand, Color, Size, Count, Cost, Barcode}} = req;
        const user_id_int = parseInt(DefaultController.validateMultiData(user_id));
        Store = DefaultController.validateMultiData(Store);
        Category = DefaultController.validateMultiData(Category);
        Subject = DefaultController.validateMultiData(Subject);
        Name = DefaultController.validateMultiData(Name);
        Brand = DefaultController.validateMultiData(Brand);
        Color = DefaultController.validateMultiData(Color);
        Size = DefaultController.validateMultiData(Size);
        const Count_int = parseInt(DefaultController.validateMultiData(Count));
        const Cost_int = parseInt(DefaultController.validateMultiData(Cost));
        Barcode = DefaultController.validateMultiData(Barcode);
        if (method !== "GET") return res.status(404).json({});
        const calculation = await CalculationService.addCalculation({
            user_id: user_id_int,
            Store: Store,
            Category: Category,
            Subject: Subject,
            Name: Name,
            Brand: Brand,
            Color: Color,
            Size: Size,
            Count: Count_int,
            Cost: Cost_int,
            Barcode: Barcode,
        });
        return res.status(200).json(calculation);
    }

    public static async updateCalculation(req: NextApiRequest, res: NextApiResponse){
        let {method, query: {id, user_id, Store, Category, Subject, Name, Brand, Color, Size, Count, Cost, Barcode}} = req;
        const id_int = parseInt(DefaultController.validateMultiData(id));
        const user_id_int = parseInt(DefaultController.validateMultiData(user_id));
        Store = DefaultController.validateMultiData(Store);
        Category = DefaultController.validateMultiData(Category);
        Subject = DefaultController.validateMultiData(Subject);
        Name = DefaultController.validateMultiData(Name);
        Brand = DefaultController.validateMultiData(Brand);
        Color = DefaultController.validateMultiData(Color);
        Size = DefaultController.validateMultiData(Size);
        const Count_int = parseInt(DefaultController.validateMultiData(Count));
        const Cost_int = parseInt(DefaultController.validateMultiData(Cost));
        Barcode = DefaultController.validateMultiData(Barcode);
        if (method !== "GET") return res.status(404).json({});
        const calculation = await CalculationService.updateCalculation(id_int, {
            user_id: user_id_int,
            Store: Store,
            Category: Category,
            Subject: Subject,
            Name: Name,
            Brand: Brand,
            Color: Color,
            Size: Size,
            Count: Count_int,
            Cost: Cost_int,
            Barcode: Barcode,
        });
        return res.status(200).json(calculation);
    }

    public static async deleteCalculation(req: NextApiRequest, res: NextApiResponse){
        let {method, query: {id}} = req;
        const id_int = parseInt(DefaultController.validateMultiData(id));
        if (method !== "GET") return res.status(404).json({});
        await CalculationService.deleteCalculation(id_int);
        return res.status(200);
    }
}
