import {NextApiRequest, NextApiResponse} from "next";
import DefaultController from "../../../backend/controllers/DefaultController";
import UserInfoController from "../../../backend/controllers/UserInfoController";
import CalculationController from "../../../backend/controllers/CalculationController";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    return await DefaultController.catchError(CalculationController.getSubjects, req, res);
}