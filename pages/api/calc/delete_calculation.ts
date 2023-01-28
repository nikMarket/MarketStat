import {NextApiRequest, NextApiResponse} from "next";
import DefaultController from "../../../backend/controllers/DefaultController";
import CalculationController from "../../../backend/controllers/CalculationController";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    return await DefaultController.catchError(CalculationController.deleteCalculation, req, res);
}