// import fs from "fs";
// import path from "path";
// import { Router, Request, Response, NextFunction } from "express";
// import Crowller from "./utils/crowller";
// import Analys from "./utils/analys";

// import bodyParser from "body-parser";
// import { getResponseData } from "./utils/util";

// const router = Router();

// // router.get("/", (req: Request, res: Response) => {
// //   res.send("hello world");
// // });

// interface BodyRequest extends Request {
//   body: { [key: string]: string | undefined };
// }

// const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
//   const isLogin = req.session ? req.session.login : false;
//   if (isLogin) {
//     next();
//   } else {
//     res.json(getResponseData(null, "请先登录"));
//   }
// };

// router.get("/", () => {});

// router.post("/login", (req: BodyRequest, res: Response) => {
//   const { password } = req.body;
//   const isLogin = req.session ? req.session.login : false;
//   if (isLogin) {
//     res.json(getResponseData(false, "已经登录过"));
//     // res.send({ err: 1, msg: "已经登录过" });
//   } else {
//     if (password === "123" && req.session) {
//       req.session.login = true;
//       res.json(getResponseData(true));
//       // res.send({ err: 0, msg: "登录成功" });
//     } else {
//       res.json(getResponseData(false, "登录失败"));
//       // res.send({ err: -1, msg: "登录失败" });
//     }
//   }
// });

// router.get("/logout", (req: BodyRequest, res: Response) => {
//   if (req.session) {
//     req.session.login = undefined;
//   }
//   res.json(getResponseData(true));
// });

// router.get("/getData", checkLogin, (req: BodyRequest, res: Response) => {
//   const url = `https://www.imooc.com/`;
//   const analys = Analys.getInstance();
//   new Crowller(url, analys);
//   res.json(getResponseData(true, "数据获取成功"));
// });

// router.get("/showData", checkLogin, (req: BodyRequest, res: Response) => {
//   try {
//     const position = path.resolve(__dirname, "../data/course.json");
//     const result = fs.readFileSync(position, "utf-8");
//     res.json(getResponseData(JSON.parse(result)));
//   } catch (e) {
//     res.json(getResponseData(false, "数据不存在"));
//   }
// });
// export default router;
