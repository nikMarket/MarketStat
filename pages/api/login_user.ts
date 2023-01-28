import {NextApiRequest, NextApiResponse} from "next";
import UserController from "../../backend/controllers/UserController";
import DefaultController from "../../backend/controllers/DefaultController";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    return await DefaultController.catchError(UserController.login, req, res);
}