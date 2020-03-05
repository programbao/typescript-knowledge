"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("./db/connect"); // 连接数据库
var UserRouter_1 = __importDefault(require("./router/UserRouter")); // 导入路由
var app = express_1.default(); // 初始化服务
// 解析表单数据  x-www-form-urlencode
// app.use(bodyParser.urlencoded({ extended: false }));
// // 解析json
// app.use(bodyParser.json());
// 使用路由
app.use(UserRouter_1.default);
// 监听网络接口
app.listen(3000, function () {
    console.log("open server port in 3000");
});
