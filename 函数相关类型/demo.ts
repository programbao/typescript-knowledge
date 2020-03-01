// function hello() {}
// const hello1 = function() {};
// const hello2 = () => {};

// function add(first: number, sencond: number) {
//   return first + sencond +  '';
// }
// 一般都是希望可以添加类型的，即使函数会自动推断 类型
// 例如： add(1,2),根据上面的函数他就会推断出返回的是字符串，但是本来是想要数字类型的，这样就不会报错也没有出现我们想要的结果
// function add(first: number, sencond: number): number {
//   return first + sencond;
// }  // 正确写法

// // void 默认代表函数没有返回值
// function sayHello(): void {
//   console.log("hello");
//   // return ''//这样就代表是错误的
// }

// // never 类型代表这个函数永远不可能执行到最后
// function errorEmitter(): never {
//   // throw new Error()
//   // console.log(123)
//   while(true) {}
// =======
// function add({ first: string, second: string }) {
//   return first + second;
// } // 这样声明是不对的，语法上就有问题
// 结构赋值的方式下面的方式才是正确的
function add({ first, second }: { first: number; second: number }): number {
  return first + second;
}

const totalDemo = add({ first: 1, second: 2 });
