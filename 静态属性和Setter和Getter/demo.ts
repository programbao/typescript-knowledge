// getter 和  setter
class Person {
  constructor(private _name: string) {}
  get name() {
    return this._name + " baobao";
  }
  set name(name: string) {
    const realName = name.split(" ")[0];
    this._name = realName;
  }
}
const person = new Person("xiaoxiaobao");
console.log(person.name); // 这里不需要你这样写getName() 不用括号
person.name = "xiaoxiao bao";
console.log(person.name);

// 单立模式
// 这里默认可以实例多个demo
// class Demo {}
// const demo1 = new Demo()
// const demo2 = new Demo()

// // 如果只想实例单个
// class Demo {
//   private constructor() {}
//   static getInstance() {
//     return new Demo()
//   } // static 表示把方法直接挂在类上，而不是在实例上
// }

class Demo {
  private static instance: Demo; // 需要调用这个instance 表示用来存储这个类
  private constructor(public name: string) {}
  static getInstance() {
    if (!this.instance) {
      this.instance = new Demo("xiaoxiaobao");
    }
    return this.instance;
  } // static 表示把方法直接挂在类上，而不是在实例上
}
const demo1 = Demo.getInstance();
const demo2 = Demo.getInstance();
console.log(demo1.name);
