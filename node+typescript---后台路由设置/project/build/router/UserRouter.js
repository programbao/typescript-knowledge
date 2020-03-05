"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userSchema_1 = __importDefault(require("../db/model/userSchema")); // 数据库用户模块
// 开启路由
var router = express_1.default.Router();
// // ts接口
// interface userInfo {
//   username: string;
//   pwd: string;
//   userAccount: string;
//   college: string;
//   grade: string;
//   state?: 0;
//   skill: String;
// }
// 编写接口
router.post("/login", function (req, res) {
    var userModelSchema = {
        username: "我叫宝",
        pwd: "123567",
        userAccount: "我叫宝",
        college: "土木工程，王牌建筑",
        grade: "2017级",
        state: 1,
        skill: "希望成为前端工程师"
    };
    userSchema_1.default
        .insertMany(userModelSchema)
        .then(function (err) {
        console.log("成功");
        res.json({ err: 0, msg: "登录已经开始,已经插入用户信息" });
    })
        .catch(function (err) {
        res.json({ err: -1, msg: err.message });
    });
});
exports.default = router;
