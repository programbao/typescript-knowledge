"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 生成随机签名
var chars = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
];
function randomSignature(n) {
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 25);
        res += chars[id];
    }
    return res;
}
exports.randomSignature = randomSignature;
