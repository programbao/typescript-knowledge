// function tsDemo(data: {x: number,y: number}) {
//   return Math.sqrt(data.x ** 2 + data.y ** 2)
// }
// 可以在外面声明类型变量
// type Point = { x: number, y: number} // 类型别名
// 更好的写法是
interface Point {
  x: number;
  y: number;
}
function www(data: Point) {
  console.log("123");
  return Math.sqrt(data.x ** 2 + data.y ** 2);
}

// 如果不传参：应有 1 个参数，但获得 0 个；在没有在浏览器运行的情况下就找出错误
www({ x: 1, y: 123 });
