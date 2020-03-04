"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path"); // 拼接路径
var fsfiles = fs.readdirSync("./first-files"); // 要读取的文件件
var dirName = path.resolve(__dirname, "./first-files");
var dirLength = dirName.split("\\").length; // 初始文件夹的长度
// const dirDeep = "├─";
var dirDeepChild = "└─ "; // 深度表示树 子深入
function countspan(count) {
    var span = "  ";
    for (var i = 0; i < count; i++) {
        span = span + " ";
    }
    return span;
}
function directoryTree(fsfiles, dirName, dirDeep, count) {
    if (dirDeep === void 0) { dirDeep = "├─"; }
    if (count === void 0) { count = 1; }
    fsfiles.forEach(function (item) {
        var filesName = path.resolve(dirName, item); // 文件路径
        console.log("" + countspan(count) + dirDeep + item);
        var stats = fs.statSync(filesName); // 统计文本 同步
        if (stats.isDirectory()) {
            count = filesName.split("\\").length - dirLength; // 层级 也就是要伸进的层数
            fsfiles = fs.readdirSync(filesName); // 读取子文件夹
            directoryTree(fsfiles, filesName, dirDeepChild, count * 2); // 递归调用
            return;
        }
    });
    console.log(fsfiles);
    console.log(dirName);
}
directoryTree(fsfiles, dirName);
