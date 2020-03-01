interface Bird {
  fly: boolean;
  sing: () => {};
}

interface Dog {
  fly: boolean;
  bark: () => {};
}

// 联合类型 --- 联合类型会提示显示共有的方法，独有大方法不会提示，如果使用了其他类型独有的属性会报错

// function trainAnial(animal: Bird | Dog) {
//   // 可以进行类型保护 --- 类型断言
//   if (animal.fly) {
//     (animal as Bird).sing()
//   }
//   (animal as Dog).bark()
//   // animal.sing() // 错误的
// }

// in语法来做类型保护
function trainAnialSecond(animal: Bird | Dog) {
  // 可以进行类型保护 --- 类型断言
  if ("sing" in animal) {
    animal.sing();
  } else {
    animal.bark();
  }
}

// typeof 来进行类型保护
function add(first: string | number, second: string | number) {
  if (typeof first === "string" || typeof second === "string") {
    return `${first}${second}`;
  }
  return first + second;
}

// instaceof 语法进行类型保护
class NumberObj {
  count: number;
}
function addSecond(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
  return 0;
}
