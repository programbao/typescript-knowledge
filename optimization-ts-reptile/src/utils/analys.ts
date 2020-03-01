import cheerio from "cheerio";
import fs from "fs";
import { Analyse } from "./crowller";

interface Course {
  title: string;
  count: number;
}
interface CourseResult {
  time: number;
  data: Course[];
}
interface Content {
  [propName: number]: Course[];
}

export default class Analyzer implements Analyse {
  private static instance: Analyzer;

  static getInstance() {
    if (!Analyzer.instance) {
      Analyzer.instance = new Analyzer();
    }
    return Analyzer.instance;
  }
  // private rawHtml = ""; // 保存HTML内容代码
  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItem = $(".bg000 .course-card-content");
    const courseInfos: Course[] = [];
    courseItem.map((index, element) => {
      const descs = $(element).find(".course-card-name");
      const title = descs.text();
      const numTxt = $(element).find(
        ".course-card-content .course-card-info span"
      );
      const count = parseInt(numTxt.eq(1).text());
      courseInfos.push({ title, count });
    });
    return {
      time: new Date().getTime(),
      data: courseInfos
    };
  }

  // 生成json
  private generateJsonContent(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {};
    // 这里再写入文件时，先读取文件---防止写入时覆盖
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }

  private constructor() {}
}
