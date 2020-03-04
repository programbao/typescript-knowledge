import * as fs from "fs";
import * as path from "path"; // 拼接路径
const fsfiles: any = fs.readdirSync("./first-files"); // 要读取的文件件
const dirName: string = path.resolve(__dirname, "./first-files");
const dirLength: number = dirName.split("\\").length; // 初始文件夹的长度
// const dirDeep = "├─";
const dirDeepChild = "└─ "; // 深度表示树 子深入
function countspan(count: number) {
  var span = "  ";
  for (let i = 0; i < count; i++) {
    span = span + " ";
  }
  return span;
}
function directoryTree(
  fsfiles: string[],
  dirName: string,
  dirDeep: string = "├─",
  count: number = 1
) {
  fsfiles.forEach((item: any) => {
    const filesName: any = path.resolve(dirName, item); // 文件路径
    console.log(`${countspan(count)}${dirDeep}${item}`);
    const stats = fs.statSync(filesName); // 统计文本 同步
    if (stats.isDirectory()) {
      count = filesName.split("\\").length - dirLength; // 层级 也就是要伸进的层数
      fsfiles = fs.readdirSync(filesName); // 读取子文件夹
      directoryTree(fsfiles, filesName, dirDeepChild, count * 2); // 递归调用
    }
  });
}
directoryTree(fsfiles, dirName);
