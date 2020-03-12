"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function use(middlewareName, middleware) {
    return function (target, key) {
        Reflect.defineMetadata(middlewareName, middleware, target, key);
    };
}
exports.use = use;
