"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
// import router from "./router";
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controller/LoginController"); // 先让login里面的代码执行一遍，这样就相当于给decorator获取到路由了
require("./controller/CrowllerController");
var decorator_1 = require("./controller/decorator"); // 这里就可以使用路由了
// 问题1： express 库的类型定义文件 .d.ts 文件类型描述不准确
// 问题2： 当我使用中间件的时候，对req或者res 做了修改之后呢，实际类型并不能改变
var app = express_1.default();
app.use(cookie_session_1.default({
    name: "session",
    keys: ["xiaoxiaobao"],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(decorator_1.router);
app.listen(7001, function () {
    console.log("server run in 7001");
});
