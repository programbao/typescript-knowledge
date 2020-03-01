// ts -> js 表示ts直接使用JS会出现问题，ts不知道怎么直接引用js
// 所以需要用一个中间处理文件 ts -> .d.ts 翻译文件 -> js
import superagent from "superagent";
import fs from "fs";
import path from "path";
import Analys from "./analys";

export interface Analyse {
  analyze: (html: string, filePath: string) => string;
}
class Crowller {
  private filePath = path.resolve(__dirname, "../data/course.js");

  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  // 存进数据
  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analys.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }

  constructor(private url: string, private analys: Analyse) {
    // 获取url内容
    this.initSpiderProcess();
  }
}
const url = `https://www.imooc.com/`;
const analys = Analys.getInstance();
const crowller = new Crowller(url, analys);
