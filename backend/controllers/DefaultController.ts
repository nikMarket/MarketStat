import {NextApiRequest, NextApiResponse} from "next";

type controllerMethod = (req: NextApiRequest, res:NextApiResponse) => void;

export default class DefaultController {
    public static validateMultiData(x) : string{
        if (typeof x !== "string") x = x[0];
        return x;
    }

    public static async catchError(func: controllerMethod, req: NextApiRequest, res: NextApiResponse) : Promise<void>{
        try {
            await func(req, res);
            return;
        }
        catch (err){
            return res.status(500).json({error: err.message})
        }
    }
}