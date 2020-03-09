export function tipMsg(err: string) {
  const txt = err.split("Path"); // 切割信息
  const keyArray: any = [];
  txt.splice(0, 1); // 去掉第一个信息
  txt.forEach((item: any) => {
    var keyword = item.split(" ").splice(1, 1);
    keyArray.push(keyword); // 将缺失的信息添加进数组
  });
  return keyArray.join();
}
