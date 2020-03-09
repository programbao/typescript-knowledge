"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tipMsg(err) {
    var txt = err.split("Path"); // 切割信息
    var keyArray = [];
    txt.splice(0, 1); // 去掉第一个信息
    txt.forEach(function (item) {
        var keyword = item.split(" ").splice(1, 1);
        keyArray.push(keyword); // 将缺失的信息添加进数组
    });
    return keyArray.join();
}
exports.tipMsg = tipMsg;
