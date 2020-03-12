import express, { Request, Response, NextFunction } from "express";
import { verifyToken } from "./token";
// 检查验证码是否正确
export function checkCode(req: Request, res: Response, code: number) {
  if (req.session && code !== req.session.mailCode) {
    return res.json({ err: -7, msg: "验证码不正确" });
  }
}
// 中间件 --- 验证登录是否过期
export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.token) {
    verifyToken(req.session.token)
      .then(sus => {
        if (typeof sus === "object") {
          next();
        } else {
          res.json({ err: -5, msg: "token无效" });
        }
      })
      .catch(err => {
        res.json({ err: -6, msg: err.message + "登录过期,签名失效" });
      });
  } else {
    res.json({ err: -1, msg: "未登录" });
  }
};
// 中间将 --- 验证是否登录
export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.login) {
    next();
  } else {
    res.json({ err: -1, msg: "未登录" });
  }
};
