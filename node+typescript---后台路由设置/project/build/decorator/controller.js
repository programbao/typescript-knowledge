"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __importDefault(require("../router"));
var methods;
(function (methods) {
    methods["get"] = "get";
    methods["post"] = "post";
})(methods || (methods = {}));
function controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata("path", target.prototype, key);
        var method = Reflect.getMetadata("method", target.prototype, key);
        var checkLoginMiddleware = Reflect.getMetadata("checkLogin", target.prototype, key);
        var checkTokenMiddleware = Reflect.getMetadata("checkToken", target.prototype, key);
        // 判断是否有中间件
        if (checkLoginMiddleware && checkTokenMiddleware) {
            router_1.default[method](path, checkLoginMiddleware, checkTokenMiddleware, target.prototype[key]);
        }
        else if (checkLoginMiddleware) {
            router_1.default[method](path, checkLoginMiddleware, target.prototype[key]);
        }
        else if (checkTokenMiddleware) {
            router_1.default[method](path, checkTokenMiddleware, target.prototype[key]);
        }
        else {
            router_1.default[method](path, target.prototype[key]);
        }
    }
}
exports.controller = controller;
