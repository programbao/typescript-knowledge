import express from "express";
import "./db/connect"; // 连接数据库
import cookieSession from "cookie-session";
import bodyParser from "body-parser"; // 解析相应请求包
import "./controller/UserController"; // 初始化对应接口路由
import router from "./router";

const app = express(); // 初始化服务
// 解析表单数据  x-www-form-urlencode
app.use(bodyParser.urlencoded({ extended: false }));
// // 解析json
app.use(bodyParser.json());
// 初始化cookie-session
app.use(
  cookieSession({
    name: "session",
    keys: ["xiaoxiaobao"],
    maxAge: 60 * 60 * 1000 // 一个小时过期
  })
);
// 使用路由
app.use(router);
// 监听网络接口
app.listen(3000, () => {
  console.log("open server port in 3000");
});
