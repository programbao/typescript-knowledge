// 普通方法，target对应的是类的prototype --- 里面对应类中的方法
// 静态方法，target对应的是类的构造函数
// 参数： target对应的构造函数，key对应的类的属性名，descriptor 对应的方法

function getNameDecorator(target: any) {
  console.log(target.prototype);
  // descriptor.writable = false; //false：方法只读模式，不能被修改
  // descriptor.value = function() {
  //   // 这个模式可以对原来的方法进行变更
  //   return "decorator";
  // };
}

@getNameDecorator
class Test {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  // 普通方法
  // @getNameDecorator
  // @getNameDecorator
  getName() {
    return this.name;
  }

  getAge() {
    return this.name;
  }
  // 静态方法
  // @getNameDecorator
  // static getName() {
  //   return '123';
  // }
}
const test = new Test("xiaoxiaobao");
console.log(test.getName());
// ======访问器装饰器
// function visitDecorator(
//   target: any,
//   key: string,
//   descriptor: PropertyDescriptor
// ) {}

// class Test {
//   private _name: string;
//   constructor(name: string) {
//     this._name = name;
//   }

//   get name() {
//     return this._name;
//   }
//   @visitDecorator
//   set name(name: string) {
//     this._name = name;
//   }
// }

// const test = new Test("xiaoxiaobao");
// test.name = "234342342";
// console.log(test.name);

// =====属性装饰器 ---- 在接收装饰器的参数时只能接收两个参数 -- 第三个不能接收
// function nameDecorator(target: any, key: string): any {
//   // 属性装饰器可以通过创建生命来对方法属性进行控制
//   const descriptor: PropertyDescriptor = {
//     writable: false
//   };
//   return descriptor;
// }

// class Test {
//   @nameDecorator
//   name = "bao";
// }

// // 修改的并不是实例上的name，而是原型上的name
// function nameDecorator(target: any, key: string): any {
//   target[key] = "woshibao";
// }

// // name 放在实例上
// class Test {
//   @nameDecorator
//   name = "bao";
// }

// const test = new Test();
// console.log(test.name);
// console.log((test as any).__proto__.name);

// =====参数装饰器 --- 参数paramIndex代表使用装饰器的参数处于哪个位置
// 参数：原型，方法，参数所在的位置
// function paramDecorator(target: any, method: string, paramIndex: number) {}

// // name 放在实例上
// class Test {
//   getInfo(@paramDecorator name: string, age: number) {
//     console.log(name, age);
//   }
// }

// const test = new Test();
// test.getInfo("bao", 30);
