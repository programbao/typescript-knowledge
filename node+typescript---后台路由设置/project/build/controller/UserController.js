"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __importDefault(require("../router/router"));
var decorator_1 = require("../decorator");
require("reflect-metadata");
var userSchema_1 = __importDefault(require("../db/model/userSchema")); // 数据库用户模块
var index_1 = require("../utils/index");
var methods;
(function (methods) {
    methods["get"] = "get";
    methods["post"] = "post";
})(methods || (methods = {}));
function controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata("path", target.prototype, key);
        var method = Reflect.getMetadata("method", target.prototype, key);
        router_1.default[method](path, target.prototype[key]);
    }
}
var UserController = /** @class */ (function () {
    function UserController() {
        // 里面处理用户相关的处理
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
        this.mailCode = 0;
    }
    // ====== 登录 ======
    /**
     * @api {post} /login  用户登录
     * @apiName 用户登录
     * @apiGroup User
     *
     * @apiParam {String} account (username/userAccount) 用户名/用户账号
     * @apiParam {Number} pwd 用户密码
     */
    UserController.prototype.login = function (req, res) {
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
                // 载荷
                var payload = {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    userInfo: account // 用户信息
                };
                var token = index_1.createToken(payload);
                // 加入登录token
                req.session.token = token;
                // 标识登录会议session
                req.session.login = true;
                res.json({ err: 0, msg: "登录成功", token: token });
            }
            else {
                res.json({ err: -2, msg: "密码错误" });
            }
        })
            .catch(function (err) {
            res.json({ err: -1, msg: err.message });
        });
    };
    UserController.prototype.register = function (req, res) {
        var code = req.body.code;
        if (!code)
            return res.json({ err: 0, msg: "缺少验证码" });
        if (code !== this.mailCode)
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
    };
    // ====== 退出 ======
    /**
     * @api {post} /logout  用户退出
     * @apiName 用户退出
     * @apiGroup User
     */
    UserController.prototype.logout = function (req, res) {
        if (req.session && req.session.login) {
            // 清除登录记录
            req.session.login = false;
            req.session.token = "";
            res.json({ err: 0, msg: "退出成功" });
        }
        res.json({ err: -4, msg: "退出失败" });
    };
    // ====== 忘记密码 ======
    /**
     * @api {post} /forgetAccount  忘记密码
     * @apiName 忘记密码
     * @apiGroup User
     *
     * @apiParam {String} userAccount 用户账号(邮箱)
     * @apiParam {Number} code 用户验证码
     */
    UserController.prototype.forgetAccount = function (req, res) {
        var _a = req.body, userAccount = _a.userAccount, pwd = _a.pwd, id = _a.id, code = _a.code;
        if (!userAccount || !pwd)
            return res.json({ err: -1, msg: "请正确填写账户密码" });
        if (!id)
            return res.json({ err: -4, msg: "缺少用户id" });
        if (!code)
            return res.json({ err: 0, msg: "缺少验证码" });
        if (code !== this.mailCode)
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
    };
    __decorate([
        decorator_1.post("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "login", null);
    __decorate([
        decorator_1.post("/reg"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "register", null);
    __decorate([
        decorator_1.get("/logout"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "logout", null);
    __decorate([
        decorator_1.post("/forgetAccount"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "forgetAccount", null);
    UserController = __decorate([
        controller
    ], UserController);
    return UserController;
}());
