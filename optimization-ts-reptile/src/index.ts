import express from "express";
import bodyParser from "body-parser";
// import router from "./router";
import cookieSession from "cookie-session";
import "./controller/LoginController"; // 先让login里面的代码执行一遍，这样就相当于给decorator获取到路由了
import "./controller/CrowllerController";
import router from "./router"; // 这里就可以使用路由了

// 问题1： express 库的类型定义文件 .d.ts 文件类型描述不准确
// 问题2： 当我使用中间件的时候，对req或者res 做了修改之后呢，实际类型并不能改变

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["xiaoxiaobao"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.listen(7001, () => {
  console.log("server run in 7001");
});
