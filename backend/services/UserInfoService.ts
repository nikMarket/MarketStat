import db from "../db"
import {UserInfo} from "@prisma/client"

export default class UserInfoService{
    public static async getUserInfoByUserId(user_id: number): Promise<UserInfo> {
        const userInfo = await db.userInfo.findUnique({
            where: {
                user_id: user_id,
            }
        });
        if (userInfo !== null){
            return userInfo;
        }
        return await db.userInfo.create({
            data: {
                user_id: user_id,
            }
        })
    }

    public static async setUserInfo(user_id : number, data : object): Promise<UserInfo>{
        if (await this.getUserInfoByUserId(user_id) !== null){
            return await db.userInfo.update({
                where: {
                    user_id: user_id,
                },
                data: data
            })
        }
        else {
            return await db.userInfo.create({
                data: {
                    user_id: user_id,
                    ...data,
                }
            })
        }
    }
}