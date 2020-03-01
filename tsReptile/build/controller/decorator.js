"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
exports.router = express_1.Router();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
function controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata("path", target.prototype, key);
        var method = Reflect.getMetadata("method", target.prototype, key);
        var handler = target.prototype[key];
        var middleware = Reflect.getMetadata("middleware", target.prototype, key);
        if (path && method && handler) {
            console.log(path, method, handler);
            if (middleware) {
                exports.router[method](path, middleware, handler);
            }
            else {
                exports.router[method](path, handler);
            }
        }
    }
}
exports.controller = controller;
// 定义工厂模式来统一一样的代码
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata("path", path, target, key);
            Reflect.defineMetadata("method", type, target, key);
        };
    };
}
// 中间件
function use(middleware) {
    return function (target, key) {
        Reflect.defineMetadata("middleware", middleware, target, key);
    };
}
exports.use = use;
exports.get = getRequestDecorator("get");
exports.post = getRequestDecorator("post");
// export function get(path: string) {
//   return function(target: any, key: string) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "get", target, key);
//   };
// }
// export function post(path: string) {
//   return function(target: any, key: string) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "post", target, key);
//   };
// }
// export { controller, get, router };
