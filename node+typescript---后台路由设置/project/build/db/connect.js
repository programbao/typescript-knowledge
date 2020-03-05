"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb://localhost/nodeTypescript", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose_1.default.connection; // 数据库的连接对象 --- 本人理解：应该是nodeTypescipt库
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("connect db ok");
});
