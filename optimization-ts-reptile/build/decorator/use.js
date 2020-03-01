"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// 中间件
function use(middleware) {
    return function (target, key) {
        Reflect.defineMetadata("middleware", middleware, target, key);
    };
}
exports.use = use;
