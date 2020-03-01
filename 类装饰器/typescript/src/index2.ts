// function testDecorator<T extends new (...args: any[]) => any>(constructor: T) {
//   return class extends constructor {
//     name = "bao";
//   };
// }
// @testDecorator
function testDecorator() {
  return function<T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
      name = "bao";
      getName() {
        return this.name;
      }
    };
  };
}
const Test = testDecorator()(
  class Test {
    name: string;
    constructor(name: string) {
      console.log(1);
      this.name = name;
    }
  }
);
// class Test {
//   name: string;
//   constructor(name: string) {
//     console.log(1);
//     this.name = name;
//   }
// }
const test = new Test("xiaoxiaobao");
console.log(test.getName());
