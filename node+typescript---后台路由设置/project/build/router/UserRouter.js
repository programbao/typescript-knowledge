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
// 装饰器
function checkToken() {
    return function (res, next) {
        index_1.verifyToken("token")
            .then(function (sus) {
            if (typeof sus === "object") {
                next();
            }
            else {
                res.json({ err: -5, msg: "token无效" });
            }
        })
            .catch(function (err) {
            res.json({ err: -6, msg: err.message });
        });
    };
}
// 编写接口
// ====== 注册 =====
/**
 * @api {post} /reg  用户注册
 * @apiName 用户注册
 * @apiGroup User
 *
 * @apiParam {String} username 用户名
 * @apiParam {Number} pwd 用户密码
 * @apiParam {String} userAccount 用户账号
 * @apiParam {String} college 学院
 * @apiParam {String} grade 年级
 * @apiParam {String} state 参赛状态
 * @apiParam {String} skill 技能
 * @apiParam {Number} code 邮箱验证码
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
            res.json({ err: -2, msg: err.message });
        }
    });
});
// ====== 登录 ======
/**
 * @api {post} /login  用户登录
 * @apiName 用户登录
 * @apiGroup User
 *
 * @apiParam {String} account (username/userAccount) 用户名/用户账号
 * @apiParam {Number} pwd 用户密码
 */
router.post("/login", function (req, res) {
    var _a = req.body, account = _a.account, pwd = _a.pwd;
    if (!account || !pwd)
        return res.json({ err: -1, msg: "请正确填写账号和密码" });
    var accountInfo = [{ username: account }, { userAccount: account }];
    // 先找是否有该用户，有就登，没就返回相应的数据
    userSchema_1.default
        .find({ $or: accountInfo })
        .then(function (sus) {
        if (sus.length !== 0) {
            return userSchema_1.default.find({
                $or: accountInfo,
                pwd: pwd
            });
        }
        else {
            res.json({ err: -2, msg: "用户未注册" });
        }
    })
        .then(function (sus) {
        if (sus.length !== 0 && req.session) {
            // 标识登录会议session
            req.session.login = true;
            req.sessionOptions.maxAge = 60 * 1000;
            // 载荷
            var payload = {
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                userInfo: account // 用户信息
            };
            var token = index_1.createToken(payload);
            res.json({ err: 0, msg: "登录成功", token: token });
        }
        else {
            res.json({ err: -2, msg: "密码错误" });
        }
    })
        .catch(function (err) {
        res.json({ err: -1, msg: err.message });
    });
});
// ====== 退出 ======
/**
 * @api {post} /logout  用户退出
 * @apiName 用户退出
 * @apiGroup User
 */
router.post("/logout", function (req, res) {
    if (req.session && req.session.login) {
        req.session.login = false;
        res.json({ err: 0, msg: "退出成功" });
    }
    res.json({ err: -4, msg: "退出失败" });
});
// ====== 忘记密码 ======
/**
 * @api {post} /forgetAccount  忘记密码
 * @apiName 忘记密码
 * @apiGroup User
 *
 * @apiParam {String} userAccount 用户账号(邮箱)
 * @apiParam {Number} code 用户验证码
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
        .then(function (sus) {
        if (sus.length === 1) {
            sus[0].pwd = ~~pwd;
            return userSchema_1.default.updateOne({ _id: id }, sus[0]);
        }
        else {
            res.json({ err: -1, msg: "用户不存在" });
        }
    })
        .then(function (sus) {
        res.json({ err: 0, msg: "更新成功" });
    })
        .catch(function (err) {
        res.json({ err: -3, msg: err.message });
    });
});
// ====== 删除 ======
/**
 * @api {delete} /delUser  删除用户
 * @apiName 删除用户
 * @apiGroup User
 *
 * @apiParam {String} id 用户唯一id
 */
router.delete("/delUser", function (req, res) {
    var id = req.body.id;
    if (!id)
        return res.json({ err: -1, msg: "缺少用户id" });
    userSchema_1.default
        .deleteOne({ _id: id })
        .then(function (sus) {
        res.json({ err: 0, msg: "删除成功" });
    })
        .catch(function (err) {
        res.json({ err: -1, msg: err.message });
    });
});
// ====== 查询/查找 ======
/**
 * @api {get} /search  用户登录
 * @apiName 用户登录
 * @apiGroup User
 *
 * @apiParam {String} account (username/userAccount) 用户名/用户账号
 * @apiParam {Nubmer} page 页数
 * @apiParam {Nubmer} pageSize 每页返回的个数
 */
router.get("/search", function (req, res) {
    // 验证是否登录了
    if (!(req.session && req.session.login)) {
        res.json({ err: -1, msg: "用户未登陆" });
    }
    var _a = req.query, account = _a.account, page = _a.page, pageSize = _a.pageSize;
    pageSize = pageSize ? pageSize : 2; // 返回个数
    page = page ? page : 1; //当前页数
    var accountInfo;
    if (account) {
        accountInfo = { $or: [{ username: account }, { userAccount: account }] };
    }
    // 获取总数
    var totel;
    var lastPage;
    userSchema_1.default.countDocuments(accountInfo).then(function (sus) {
        totel = sus;
        lastPage = Math.ceil(sus / pageSize);
    });
    // 设置限制条数和跳过去数据----limit和skip
    userSchema_1.default
        .find(accountInfo)
        .limit(~~pageSize)
        .skip((page - 1) * pageSize)
        .then(function (sus) {
        var lists = sus;
        res.json({
            err: 0,
            msg: "搜索成功",
            data: {
                lists: lists,
                totel: totel,
                currentPage: page,
                lastPage: lastPage,
                pageSize: pageSize
            }
        });
    })
        .catch(function (err) {
        res.json({ err: -1, msg: err.message });
    });
});
// ====== 验证码 ======
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
