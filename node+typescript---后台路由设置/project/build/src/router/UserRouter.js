"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// 开启路由
var router = express_1.default.Router();
// 编写接口
router.post("/login", function (req, res) {
    res.json({ err: 0, msg: "登录已经开始" });
});
// router.get("/logout", (req: Request, res: Response) => {
//   res.json({ err: 0, msg: "目前还没有登录，已是退出状态" });
// });
exports.default = router;
