"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var Analyzer = /** @class */ (function () {
    function Analyzer() {
    }
    Analyzer.getInstance = function () {
        if (!Analyzer.instance) {
            Analyzer.instance = new Analyzer();
        }
        return Analyzer.instance;
    };
    // private rawHtml = ""; // 保存HTML内容代码
    Analyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseItem = $(".bg000 .course-card-content");
        var courseInfos = [];
        courseItem.map(function (index, element) {
            var descs = $(element).find(".course-card-name");
            var title = descs.text();
            var numTxt = $(element).find(".course-card-content .course-card-info span");
            var count = parseInt(numTxt.eq(1).text());
            courseInfos.push({ title: title, count: count });
        });
        return {
            time: new Date().getTime(),
            data: courseInfos
        };
    };
    // 生成json
    Analyzer.prototype.generateJsonContent = function (courseInfo, filePath) {
        var fileContent = {};
        // 这里再写入文件时，先读取文件---防止写入时覆盖
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    };
    Analyzer.prototype.analyze = function (html, filePath) {
        var courseInfo = this.getCourseInfo(html);
        var fileContent = this.generateJsonContent(courseInfo, filePath);
        return JSON.stringify(fileContent);
    };
    return Analyzer;
}());
exports.default = Analyzer;
