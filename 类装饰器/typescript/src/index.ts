//  类装饰器
// 类装饰器本身是一个函数
// 类装饰器接受的参数是构造器
// 装饰器通过@ 符号来使用

/**
 *  对修饰器的实验支持是一项将在将来版本中更改的功能。
 *  在tconfig.json 配置文件里面设置 "experimentalDecorators" 选项以删除此警告。
 * */
// function testDecorator(constructor: any) {
//   constructor.prototype.getName = () => {
//     console.log("xiaoxiaobao");
//   };
// }

// function testDecorator1(constructor: any) {
//   console.log("我是谁");
// }
// @testDecorator
// @testDecorator1
// class Test {}
// const test = new Test();
// (test as any).getName();

// 判断使用装饰器
function testDecorator(flag: boolean) {
  if (flag) {
    return function(constructor: any) {
      constructor.prototype.getName = () => {
        console.log("xiaoxiaobao");
      };
    };
  } else {
    return function(constructor: any) {};
  }
}

@testDecorator(true)
class Test {}
const test = new Test();
(test as any).getName();
