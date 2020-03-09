"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userSchema_1 = __importDefault(require("../db/model/userSchema")); // 数据库用户模块
var index_1 = require("../utils/index");
// 开启路由
var router = express_1.default.Router();
var mailCode = 0; // 邮箱验证码
// 编写接口
/**
 * @api {post} /reg  用户注册
 * @apiName 用户注册
 * @apiGroup User
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} pwd 用户密码
 * @apiParam {String} userAccount 用户账号
 * @apiParam {String} college 学院
 * @apiParam {String} grade 年级
 * @apiParam {String} state 参赛状态
 * @apiParam {String} skill 技能
 * @apiParam {String} code 邮箱验证码
 */
router.post("/reg", function (req, res) {
    var code = req.body.code;
    if (!code)
        return res.json({ err: 0, msg: "缺少验证码" });
    if (code !== mailCode)
        return res.json({ err: 0, msg: "验证码不正确" });
    userSchema_1.default
        .insertMany(req.body)
        .then(function () {
        res.json({ err: 0, msg: "注册成功", obj: req.body });
    })
        .catch(function (err) {
        try {
            var keytxt = index_1.tipMsg(err.message);
            res.json({ err: -1, msg: keytxt + "\u662F\u5FC5\u9700\u7684" });
        }
        catch (error) {
            res.json({ err: -1, msg: err.message });
        }
    });
});
/**
 * @api {post} /login  用户登录
 * @apiName 用户登录
 * @apiGroup User
 *
 * @apiParam {String} account (username/userAccount) 用户名/用户账号
 * @apiParam {String} pwd 用户密码
 */
router.post("/login", function (req, res) {
    var _a = req.body, account = _a.account, pwd = _a.pwd;
    if (!account || !pwd)
        return res.json({ err: -1, msg: "请正确填写账号和密码" });
    var accountInfo = [{ username: account }, { userAccount: account }];
    userSchema_1.default
        .find({ $or: accountInfo })
        .then(function (suc) {
        if (suc.length !== 0) {
            return userSchema_1.default.find({
                $or: accountInfo,
                pwd: pwd
            });
        }
        else {
            res.json({ err: -2, msg: "用户未注册" });
        }
    })
        .then(function (suc) {
        if (suc.length !== 0) {
            res.json({ err: 0, msg: "登录成功" });
        }
        else {
            res.json({ err: -2, msg: "密码错误" });
        }
    })
        .catch(function (err) {
        res.json({ err: -1, msg: err.message });
    });
});
/**
 * @api {post} /forgetAccount  忘记密码
 * @apiName 忘记密码
 * @apiGroup User
 *
 * @apiParam {String} userAccount 用户账号(邮箱)
 * @apiParam {String} code 用户验证码
 */
router.post("/forgetAccount", function (req, res) {
    var _a = req.body, userAccount = _a.userAccount, pwd = _a.pwd, id = _a.id, code = _a.code;
    if (!userAccount || !pwd)
        return res.json({ err: -1, msg: "请正确填写账户密码" });
    if (!id)
        return res.json({ err: -4, msg: "缺少用户id" });
    if (!code)
        return res.json({ err: 0, msg: "缺少验证码" });
    if (code !== mailCode)
        return res.json({ err: 0, msg: "验证码不正确" });
    userSchema_1.default
        .find({ _id: id })
        .then(function (suc) {
        if (suc.length === 1) {
            suc[0].pwd = ~~pwd;
            return userSchema_1.default.updateOne({ _id: id }, suc[0]);
        }
        else {
            res.json({ err: -1, msg: "用户不存在" });
        }
    })
        .then(function (suc) {
        res.json({ err: 0, msg: "更新成功" });
    })
        .catch(function (err) {
        res.json({ err: -3, msg: err.message });
    });
});
/**
 * @api {post} /sendMail  用户获取验证码
 * @apiName 获取验证码
 * @apiGroup User
 *
 * @apiParam {String} userAccount 用户账号---邮箱
 */
router.post("/getCode", function (req, res) {
    var userAccount = req.body.userAccount;
    if (!userAccount)
        return res.json({ err: -1, msg: "请填写邮箱" });
    // 五位随机数
    var code = parseInt(Math.random() * 10000 + 10000);
    mailCode = code;
    index_1.sendMail(userAccount, code)
        .then(function () {
        res.json({ err: 0, msg: "获取成功，请查看你邮箱" });
    })
        .catch(function (err) {
        res.json({ err: -1, msg: err.message });
    });
});
exports.default = router;
