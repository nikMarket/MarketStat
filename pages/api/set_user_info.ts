import {NextApiRequest, NextApiResponse} from "next";
import DefaultController from "../../backend/controllers/DefaultController";
import UserInfoController from "../../backend/controllers/UserInfoController";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    return await DefaultController.catchError(UserInfoController.setUserInfoByUserId, req, res);
}