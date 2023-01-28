import {NextApiRequest, NextApiResponse} from "next";
import DefaultController from "./DefaultController";
import {UserInfo} from "@prisma/client";
import UserInfoService from "../services/UserInfoService";
export default class UserInfoController implements DefaultController{
    public static async getUserInfoByUserId(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        let {query: {user_id}, method} = req;
        if (method !== "GET") return res.status(404).json({});
        const user_id_int = parseInt(DefaultController.validateMultiData(user_id));
        const userInfo : UserInfo = await UserInfoService.getUserInfoByUserId(user_id_int);
        return res.status(200).json({userInfo: userInfo});
    }

    public static async setUserInfoByUserId(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        let {query: {user_id, data}, method} = req;
        if (method !== "GET") return res.status(404).json({});
        const user_id_int = parseInt(DefaultController.validateMultiData(user_id));
        const data_json = JSON.parse(DefaultController.validateMultiData(data));
        const newInfo : UserInfo = await UserInfoService.setUserInfo(user_id_int, data_json);
        res.status(200).json({userInfo: newInfo});
    }
}