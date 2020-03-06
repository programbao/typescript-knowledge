import express from "express";
import { Request, Response } from "express";
import userModel from "../db/model/userSchema"; // 数据库用户模块
// 开启路由
const router = express.Router();

// // ts接口
// interface userInfo {
//   username: string;
//   pwd: string;
//   userAccount: string;
//   college: string;
//   grade: string;
//   state?: 0;
//   skill: String;
// }
// 编写接口
/**
 * @api {post} /reg  用户注册
 * @apiName 用户注册
 * @apiGroup User
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} pwd 用户密码
 * @apiParam {String} userAccount 用户账号
 * @apiParam {String} college 学院
 * @apiParam {String} grade 年级
 * @apiParam {String} state 参赛状态
 * @apiParam {String} skill 技能
 * @apiParam {String} code 邮箱验证码
 */
router.post("/reg", (req: Request, res: Response) => {
  console.log(req.body);
  // const userModelSchema = {
  //   username: "我叫宝",
  //   pwd: "123567",
  //   userAccount: "我叫宝",
  //   college: "土木工程，王牌建筑",
  //   grade: "2017级",
  //   state: 1,
  //   skill: "希望成为前端工程师"
  // };
  function tipMsg(err: string) {
    const txt = err.split("Path"); // 切割信息
    const keyArray: any = [];
    txt.splice(0, 1); // 去掉第一个信息
    txt.forEach((item: any) => {
      var keyword = item.split(" ").splice(1, 1);
      keyArray.push(keyword); // 将缺失的信息添加进数组
    });
    return keyArray.join();
  }

  userModel
    .insertMany(req.body)
    .then(() => {
      res.json({ err: 0, msg: "注册成功", obj: req.body });
    })
    .catch(err => {
      try {
        const keytxt = tipMsg(err.message);
        res.json({ err: -1, msg: `${keytxt}是必需的` });
      } catch (error) {
        res.json({ err: -1, msg: err.message });
      }
    });
});
export default router;
