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
 * @api {post} /login  用户登录
 * @apiName 用户登录
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
router.post("/login", (req: Request, res: Response) => {
  const userModelSchema = {
    username: "我叫宝",
    pwd: "123567",
    userAccount: "我叫宝",
    college: "土木工程，王牌建筑",
    grade: "2017级",
    state: 1,
    skill: "希望成为前端工程师"
  };
  userModel
    .insertMany(userModelSchema)
    .then(err => {
      console.log("成功");
      res.json({ err: 0, msg: "登录已经开始,已经插入用户信息" });
    })
    .catch(err => {
      res.json({ err: -1, msg: err.message });
    });
});
export default router;
