import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import fs from "fs";
import path from "path";
import { controller, get, use } from "./decorator";
import { getResponseData } from "../utils/util";
import Crowller from "../utils/crowller";
import Analys from "../utils/analys";
interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, "请先登录"));
  }
};
@controller
class CrowllerController {
  @get("/getData")
  @use(checkLogin)
  getData(req: BodyRequest, res: Response) {
    const url = `https://www.imooc.com/`;
    const analys = Analys.getInstance();
    new Crowller(url, analys);
    res.json(getResponseData(true, "数据获取成功"));
  }

  @get("/showData")
  @use(checkLogin)
  showData(req: BodyRequest, res: Response) {
    try {
      const position = path.resolve(__dirname, "../../data/course.json");
      const result = fs.readFileSync(position, "utf-8");
      res.json(getResponseData(JSON.parse(result)));
    } catch (e) {
      res.json(getResponseData(false, "数据不存在"));
    }
  }
}
