"use strict";
// import express from "express";
// import { Request, Response, NextFunction } from "express";
// import userModel from "../db/model/userSchema"; // 数据库用户模块
// import { sendMail, tipMsg, createToken, verifyToken } from "../utils/index";
// // 开启路由
// const router = express.Router();
// var mailCode: number = 0; // 邮箱验证码
// // 中间件 --- 验证登录是否过期
// const checkToken = (req: Request, res: Response, next: NextFunction) => {
//   if (req.session && req.session.token) {
//     verifyToken(req.session.token)
//       .then(sus => {
//         if (typeof sus === "object") {
//           next();
//         } else {
//           res.json({ err: -5, msg: "token无效" });
//         }
//       })
//       .catch(err => {
//         res.json({ err: -6, msg: err.message + "登录过期,签名失效" });
//       });
//   } else {
//     res.json({ err: -1, msg: "未登录" });
//   }
// };
// // 中间将 --- 验证是否登录
// const checkLogin = (req: Request, res: Response, next: NextFunction) => {
//   if (req.session && req.session.login) {
//     next();
//   } else {
//     res.json({ err: -1, msg: "未登录" });
//   }
// };
// // 编写接口
// // ====== 注册 =====
// /**
//  * @api {post} /reg  用户注册
//  * @apiName 用户注册
//  * @apiGroup User
//  *
//  * @apiParam {String} username 用户名
//  * @apiParam {Number} pwd 用户密码
//  * @apiParam {String} userAccount 用户账号
//  * @apiParam {String} college 学院
//  * @apiParam {String} grade 年级
//  * @apiParam {String} state 参赛状态
//  * @apiParam {String} skill 技能
//  * @apiParam {Number} code 邮箱验证码
//  */
// router.post("/reg", (req: Request, res: Response) => {
//   let { code } = req.body;
//   if (!code) return res.json({ err: 0, msg: "缺少验证码" });
//   if (code !== mailCode) return res.json({ err: 0, msg: "验证码不正确" });
//   userModel
//     .insertMany(req.body)
//     .then(() => {
//       res.json({ err: 0, msg: "注册成功", obj: req.body });
//     })
//     .catch(err => {
//       try {
//         const keytxt = tipMsg(err.message);
//         res.json({ err: -1, msg: `${keytxt}是必需的` });
//       } catch (error) {
//         res.json({ err: -2, msg: err.message });
//       }
//     });
// });
// // ====== 登录 ======
// /**
//  * @api {post} /login  用户登录
//  * @apiName 用户登录
//  * @apiGroup User
//  *
//  * @apiParam {String} account (username/userAccount) 用户名/用户账号
//  * @apiParam {Number} pwd 用户密码
//  */
// router.post("/login", (req: Request, res: Response) => {
//   let { account, pwd } = req.body;
//   if (!account || !pwd)
//     return res.json({ err: -1, msg: "请正确填写账号和密码" });
//   let accountInfo = [{ username: account }, { userAccount: account }];
//   // 先找是否有该用户，有就登，没就返回相应的数据
//   userModel
//     .find({ $or: accountInfo })
//     .then(sus => {
//       if (sus.length !== 0) {
//         return userModel.find({
//           $or: accountInfo,
//           pwd
//         });
//       } else {
//         res.json({ err: -2, msg: "用户未注册" });
//       }
//     })
//     .then((sus: any) => {
//       if (sus.length !== 0 && req.session) {
//         // 载荷
//         let payload = {
//           exp: Math.floor(Date.now() / 1000) + 60 * 60, // 创建验证过期时间
//           userInfo: account // 用户信息
//         };
//         let token = createToken(payload);
//         // 加入登录token
//         req.session.token = token;
//         // 标识登录会议session
//         req.session.login = true;
//         res.json({ err: 0, msg: "登录成功", token });
//       } else {
//         res.json({ err: -2, msg: "密码错误" });
//       }
//     })
//     .catch(err => {
//       res.json({ err: -1, msg: err.message });
//     });
// });
// // ====== 退出 ======
// /**
//  * @api {post} /logout  用户退出
//  * @apiName 用户退出
//  * @apiGroup User
//  */
// router.post("/logout", (req: Request, res: Response) => {
//   if (req.session && req.session.login) {
//     req.session.login = false;
//     res.json({ err: 0, msg: "退出成功" });
//   }
//   res.json({ err: -4, msg: "退出失败" });
// });
// // ====== 忘记密码 ======
// /**
//  * @api {post} /forgetAccount  忘记密码
//  * @apiName 忘记密码
//  * @apiGroup User
//  *
//  * @apiParam {String} userAccount 用户账号(邮箱)
//  * @apiParam {Number} code 用户验证码
//  */
// router.post("/forgetAccount", (req: Request, res: Response) => {
//   let { userAccount, pwd, id, code } = req.body;
//   if (!userAccount || !pwd)
//     return res.json({ err: -1, msg: "请正确填写账户密码" });
//   if (!id) return res.json({ err: -4, msg: "缺少用户id" });
//   if (!code) return res.json({ err: 0, msg: "缺少验证码" });
//   if (code !== mailCode) return res.json({ err: 0, msg: "验证码不正确" });
//   userModel
//     .find({ _id: id })
//     .then((sus: any) => {
//       if (sus.length === 1) {
//         sus[0].pwd = ~~pwd;
//         return userModel.updateOne({ _id: id }, sus[0]);
//       } else {
//         res.json({ err: -1, msg: "用户不存在" });
//       }
//     })
//     .then(sus => {
//       res.json({ err: 0, msg: "更新成功" });
//     })
//     .catch(err => {
//       res.json({ err: -3, msg: err.message });
//     });
// });
// // ====== 删除 ======
// /**
//  * @api {delete} /delUser  删除用户
//  * @apiName 删除用户
//  * @apiGroup User
//  *
//  * @apiParam {String} id 用户唯一id
//  */
// router.delete(
//   "/delUser",
//   checkLogin,
//   checkToken,
//   (req: Request, res: Response) => {
//     let { id } = req.body;
//     if (!id) return res.json({ err: -1, msg: "缺少用户id" });
//     userModel
//       .deleteOne({ _id: id })
//       .then(sus => {
//         res.json({ err: 0, msg: "删除成功" });
//       })
//       .catch(err => {
//         res.json({ err: -1, msg: err.message });
//       });
//   }
// );
// // ====== 查询/查找 ======
// /**
//  * @api {get} /search  用户查询
//  * @apiName 用户登录
//  * @apiGroup User
//  *
//  * @apiParam {String} account (username/userAccount) 用户名/用户账号
//  * @apiParam {Nubmer} page 页数
//  * @apiParam {Nubmer} pageSize 每页返回的个数
//  */
// router.get("/search", checkLogin, checkToken, (req: Request, res: Response) => {
//   // 验证是否登录了
//   if (!(req.session && req.session.login)) {
//     res.json({ err: -1, msg: "用户未登陆" });
//   }
//   let { account, page, pageSize } = req.query;
//   pageSize = pageSize ? pageSize : 2; // 返回个数
//   page = page ? page : 1; //当前页数
//   let accountInfo: any;
//   if (account) {
//     accountInfo = { $or: [{ username: account }, { userAccount: account }] };
//   }
//   // 获取总数
//   let totel: number;
//   let lastPage: number;
//   userModel.countDocuments(accountInfo).then(sus => {
//     totel = sus;
//     lastPage = Math.ceil(sus / pageSize);
//   });
//   // 设置限制条数和跳过去数据----limit和skip
//   userModel
//     .find(accountInfo)
//     .limit(~~pageSize)
//     .skip((page - 1) * pageSize)
//     .then(sus => {
//       let lists: any[] = sus;
//       res.json({
//         err: 0,
//         msg: "搜索成功",
//         data: {
//           lists,
//           totel,
//           currentPage: page,
//           lastPage,
//           pageSize
//         }
//       });
//     })
//     .catch(err => {
//       res.json({ err: -1, msg: err.message });
//     });
// });
// // ====== 验证码 ======
// /**
//  * @api {post} /sendMail  用户获取验证码
//  * @apiName 获取验证码
//  * @apiGroup User
//  *
//  * @apiParam {String} userAccount 用户账号---邮箱
//  */
// router.post("/getCode", (req: Request, res: Response) => {
//   let { userAccount } = req.body;
//   if (!userAccount) return res.json({ err: -1, msg: "请填写邮箱" });
//   // 五位随机数
//   let code = (parseInt as any)(Math.random() * 10000 + 10000);
//   mailCode = code;
//   sendMail(userAccount, code)
//     .then(() => {
//       res.json({ err: 0, msg: "获取成功，请查看你邮箱" });
//     })
//     .catch(err => {
//       res.json({ err: -1, msg: err.message });
//     });
// });
// export default router;
