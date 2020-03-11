"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// 枚举列举请求方法
var methods;
(function (methods) {
    methods["get"] = "get";
    methods["post"] = "post";
    methods["delete"] = "delete";
})(methods || (methods = {}));
/**
 * 创建工厂模式函数，总共要三层函数包装
 * 第一层：本函数（本文件）调用，传递方法methods
 * 第二层：在装饰的函数上使用，传递path路由路径
 * 第三层：定义元数据
 * */
function request(methods) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata("path", path, target, key);
            Reflect.defineMetadata("method", methods, target, key);
        };
    };
}
// 创建路由请求对象
exports.get = request(methods.get);
exports.post = request(methods.post);
exports.del = request(methods.delete);
