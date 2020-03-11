"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("./db/connect"); // 连接数据库
var cookie_session_1 = __importDefault(require("cookie-session"));
var body_parser_1 = __importDefault(require("body-parser")); // 解析相应请求包
require("./controller/UserController"); // 初始化对应接口路由
var router_1 = __importDefault(require("./router/router"));
var app = express_1.default(); // 初始化服务
// 解析表单数据  x-www-form-urlencode
app.use(body_parser_1.default.urlencoded({ extended: false }));
// // 解析json
app.use(body_parser_1.default.json());
// 初始化cookie-session
app.use(cookie_session_1.default({
    name: "session",
    keys: ["xiaoxiaobao"],
    maxAge: 60 * 60 * 1000
}));
// 使用路由
app.use(router_1.default);
// 监听网络接口
app.listen(3000, function () {
    console.log("open server port in 3000");
});
