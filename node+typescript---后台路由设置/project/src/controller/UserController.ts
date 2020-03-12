import router from "../router";
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import userModel from "../db/model/userSchema"; // 数据库用户模块
import {
  sendMail,
  tipMsg,
  createToken,
  checkCode,
  checkToken,
  checkLogin
} from "../utils/index";
import { post, get, controller, use, del } from "../decorator";

@controller
class UserController {
  // 里面处理用户相关的处理

  //

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
          }); // 返回登录
        } else {
          res.json({ err: -2, msg: "用户未注册" });
        }
      })
      .then((sus: any) => {
        // 登录处理
        if (sus.length !== 0 && req.session) {
          // 载荷
          let payload = {
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // 创建验证过期时间
            userInfo: account // 用户信息
          };
          let token = createToken(payload);
          // 加入登录token
          req.session.token = token;
          // 标识登录会议(session)login
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

  @post("/reg")
  register(req: Request, res: Response) {
    let { code, userAccount, pwd } = req.body;
    if (!code) return res.json({ err: 0, msg: "缺少验证码" });
    if (!userAccount) return res.json({ err: 0, msg: "请填写你要注册的账号" });
    if (!pwd) return res.json({ err: 0, msg: "请设置密码" });
    checkCode(req, res, ~~code);
    // 这里是查询是否有这个，有就不注册，没有就注册
    userModel
      .find({ userAccount, pwd })
      .then(sus => {
        console.log(sus);
        if (sus.length !== 0) {
          res.json({ err: -1, msg: "该用户已经存在" });
        } else {
          return userModel.insertMany(req.body);
        }
      })
      .then(() => {
        (req.session as any).mailCode = 0;
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
  @use("checkLogin", checkLogin)
  logout(req: Request, res: Response) {
    if (req.session && req.session.login) {
      // 清除登录记录
      req.session.login = false;
      req.session.token = "";
      res.json({ err: 0, msg: "退出成功" });
    }
    res.json({ err: -4, msg: "退出失败/检查是否已经登录" });
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
    checkCode(req, res, code);
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

  // ====== 删除 ======
  /**
   * @api {delete} /delUser  删除用户
   * @apiName 删除用户
   * @apiGroup User
   *
   * @apiParam {String} id 用户唯一id
   */
  @del("/delUser")
  @use("checkLogin", checkLogin)
  @use("checkToken", checkToken)
  delUser(req: Request, res: Response) {
    let { id } = req.body;
    if (!id) return res.json({ err: -1, msg: "缺少用户id" });
    userModel
      .deleteOne({ _id: id })
      .then(sus => {
        res.json({ err: 0, msg: "删除成功" });
      })
      .catch(err => {
        res.json({ err: -1, msg: err.message });
      });
  }

  // ====== 查询/查找 ======
  /**
   * @api {get} /search  用户查询
   * @apiName 用户登录
   * @apiGroup User
   *
   * @apiParam {String} account (username/userAccount) 用户名/用户账号
   * @apiParam {Nubmer} page 页数
   * @apiParam {Nubmer} pageSize 每页返回的个数
   */
  @get("/search")
  @use("checkLogin", checkLogin)
  @use("checkToken", checkToken)
  search(req: Request, res: Response) {
    // 验证是否登录了
    if (!(req.session && req.session.login)) {
      res.json({ err: -1, msg: "用户未登陆" });
    }
    let { account, page, pageSize } = req.query;
    pageSize = pageSize ? pageSize : 2; // 返回个数
    page = page ? page : 1; //当前页数
    let accountInfo: any;
    if (account) {
      accountInfo = { $or: [{ username: account }, { userAccount: account }] };
    }
    // 获取总数
    let totel: number;
    let lastPage: number;
    userModel.countDocuments(accountInfo).then(sus => {
      totel = sus;
      lastPage = Math.ceil(sus / pageSize);
    });
    // 设置限制条数和跳过去数据----limit和skip
    userModel
      .find(accountInfo)
      .limit(~~pageSize)
      .skip((page - 1) * pageSize)
      .then(sus => {
        let lists: any[] = sus;
        res.json({
          err: 0,
          msg: "搜索成功",
          data: {
            lists,
            totel,
            currentPage: page,
            lastPage,
            pageSize
          }
        });
      })
      .catch(err => {
        res.json({ err: -1, msg: err.message });
      });
  }

  // ====== 验证码 ======
  /**
   * @api {post} /sendMail  用户获取验证码
   * @apiName 获取验证码
   * @apiGroup User
   *
   * @apiParam {String} userAccount 用户账号---邮箱
   */
  @post("/getCode")
  @use("checkLogin", checkLogin)
  @use("checkToken", checkToken)
  getCode(req: Request, res: Response) {
    let { userAccount } = req.body;
    if (!userAccount) return res.json({ err: -1, msg: "请填写邮箱" });
    // 五位随机数
    let mailCode = (parseInt as any)(Math.random() * 10000 + 10000);
    sendMail(userAccount, mailCode)
      .then(() => {
        (req.session as any).mailCode = mailCode;
        res.json({ err: 0, msg: "获取成功，请查看你邮箱" });
      })
      .catch(err => {
        res.json({ err: -1, msg: err.message });
      });
  }
}
