"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
// 初始存入对象
var userModelSchema = {
    username: { type: String, required: true },
    pwd: { type: Number, required: true },
    userAccount: { type: String, required: true },
    college: { type: String, required: true },
    grade: { type: String, required: true },
    state: { type: Number, default: 0 },
    code: { type: Number, default: 0 },
    skill: String
};
var userSchema = new mongoose_1.default.Schema(userModelSchema);
var userModel = mongoose_1.default.model("users", userSchema); // 初始用户模块对象,并导出
exports.default = userModel;
