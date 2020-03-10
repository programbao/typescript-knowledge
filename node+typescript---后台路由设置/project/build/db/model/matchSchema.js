"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
// 初始存入对象
var matchModelSchema = {
    matchName: { type: String, required: true },
    time: { type: String, required: true },
    matchType: { type: String, required: true },
    sponsor: { type: String, required: true },
    state: { type: Number, default: 0 }
};
var matchSchema = new mongoose_1.default.Schema(matchModelSchema);
var matchModel = mongoose_1.default.model("matchs", matchSchema); // 初始用户模块对象,并导出
exports.default = matchModel;
