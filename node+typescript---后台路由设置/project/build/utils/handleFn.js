"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
// 检查验证码是否正确
function checkCode(req, res, code) {
    if (req.session && code !== req.session.mailCode) {
        return res.json({ err: -7, msg: "验证码不正确" });
    }
}
exports.checkCode = checkCode;
// 中间件 --- 验证登录是否过期
exports.checkToken = function (req, res, next) {
    if (req.session && req.session.token) {
        token_1.verifyToken(req.session.token)
            .then(function (sus) {
            if (typeof sus === "object") {
                next();
            }
            else {
                res.json({ err: -5, msg: "token无效" });
            }
        })
            .catch(function (err) {
            res.json({ err: -6, msg: err.message + "登录过期,签名失效" });
        });
    }
    else {
        res.json({ err: -1, msg: "未登录" });
    }
};
// 中间将 --- 验证是否登录
exports.checkLogin = function (req, res, next) {
    if (req.session && req.session.login) {
        next();
    }
    else {
        res.json({ err: -1, msg: "未登录" });
    }
};
