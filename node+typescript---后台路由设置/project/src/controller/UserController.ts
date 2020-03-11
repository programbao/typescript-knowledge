import router from "../router/router";
import { post, get } from "../decorator";
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import userModel from "../db/model/userSchema"; // 数据库用户模块
import { sendMail, tipMsg, createToken, verifyToken } from "../utils/index";

enum methods {
  get = "get",
  post = "post"
}
function controller(target: any) {
  for (const key in target.prototype) {
    const path = Reflect.getMetadata("path", target.prototype, key);
    const method: methods = Reflect.getMetadata(
      "method",
      target.prototype,
      key
    );
    router[method](path, target.prototype[key]);
  }
}

@controller
class UserController {
  // 里面处理用户相关的处理

  // ====== 登录 ======
  /**
   * @api {post} /login  用户登录
   * @apiName 用户登录
   * @apiGroup User
   *
   * @apiParam {String} account (username/userAccount) 用户名/用户账号
   * @apiParam {Number} pwd 用户密码
   */
  @post("/login")
  login(req: Request, res: Response) {
    let { account, pwd } = req.body;
    if (!account || !pwd)
      return res.json({ err: -1, msg: "请正确填写账号和密码" });
    let accountInfo = [{ username: account }, { userAccount: account }];
    // 先找是否有该用户，有就登，没就返回相应的数据
    userModel
      .find({ $or: accountInfo })
      .then(sus => {
        if (sus.length !== 0) {
          return userModel.find({
            $or: accountInfo,
            pwd
          });
        } else {
          res.json({ err: -2, msg: "用户未注册" });
        }
      })
      .then((sus: any) => {
        if (sus.length !== 0 && req.session) {
          // 载荷
          let payload = {
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // 创建验证过期时间
            userInfo: account // 用户信息
          };
          let token = createToken(payload);
          // 加入登录token
          req.session.token = token;
          // 标识登录会议session
          req.session.login = true;
          res.json({ err: 0, msg: "登录成功", token });
        } else {
          res.json({ err: -2, msg: "密码错误" });
        }
      })
      .catch(err => {
        res.json({ err: -1, msg: err.message });
      });
  }

  // ====== 注册 =====
  /**
   * @api {post} /reg  用户注册
   * @apiName 用户注册
   * @apiGroup User
   *
   * @apiParam {String} username 用户名
   * @apiParam {Number} pwd 用户密码
   * @apiParam {String} userAccount 用户账号
   * @apiParam {String} college 学院
   * @apiParam {String} grade 年级
   * @apiParam {String} state 参赛状态
   * @apiParam {String} skill 技能
   * @apiParam {Number} code 邮箱验证码
   */

  private mailCode: number = 0;
  @post("/reg")
  register(req: Request, res: Response) {
    let { code } = req.body;
    if (!code) return res.json({ err: 0, msg: "缺少验证码" });
    if (code !== this.mailCode)
      return res.json({ err: 0, msg: "验证码不正确" });
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
          res.json({ err: -2, msg: err.message });
        }
      });
  }

  // ====== 退出 ======
  /**
   * @api {post} /logout  用户退出
   * @apiName 用户退出
   * @apiGroup User
   */
  @get("/logout")
  logout(req: Request, res: Response) {
    if (req.session && req.session.login) {
      // 清除登录记录
      req.session.login = false;
      req.session.token = "";
      res.json({ err: 0, msg: "退出成功" });
    }
    res.json({ err: -4, msg: "退出失败" });
  }

  // ====== 忘记密码 ======
  /**
   * @api {post} /forgetAccount  忘记密码
   * @apiName 忘记密码
   * @apiGroup User
   *
   * @apiParam {String} userAccount 用户账号(邮箱)
   * @apiParam {Number} code 用户验证码
   */
  @post("/forgetAccount")
  forgetAccount(req: Request, res: Response) {
    let { userAccount, pwd, id, code } = req.body;
    if (!userAccount || !pwd)
      return res.json({ err: -1, msg: "请正确填写账户密码" });
    if (!id) return res.json({ err: -4, msg: "缺少用户id" });
    if (!code) return res.json({ err: 0, msg: "缺少验证码" });
    if (code !== this.mailCode)
      return res.json({ err: 0, msg: "验证码不正确" });
    userModel
      .find({ _id: id })
      .then((sus: any) => {
        if (sus.length === 1) {
          sus[0].pwd = ~~pwd;
          return userModel.updateOne({ _id: id }, sus[0]);
        } else {
          res.json({ err: -1, msg: "用户不存在" });
        }
      })
      .then(sus => {
        res.json({ err: 0, msg: "更新成功" });
      })
      .catch(err => {
        res.json({ err: -3, msg: err.message });
      });
  }
}
