import express from "express";
import "./db/connect"; // 连接数据库
import bodyParser from "body-parser"; // 解析相应请求包
import UserRouter from "./router/UserRouter"; // 导入路由
const app = express(); // 初始化服务
// 解析表单数据  x-www-form-urlencode
// app.use(bodyParser.urlencoded({ extended: false }));
// // 解析json
// app.use(bodyParser.json());
// 使用路由
app.use(UserRouter);
// 监听网络接口
app.listen(3000, () => {
  console.log("open server port in 3000");
});
