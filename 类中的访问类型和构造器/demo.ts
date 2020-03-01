// private, protected, public 访问类型
// 1.public 允许我在类的内外被调用
// 2.private 允许在类内使用
// 2.protected 允许在类内及集成的子类中使用
// class Person {
//   // 对象里面的就属于类内部
//   public name: string; // 如果没有给他制定访问类型，默认是public允许访问（内部 外部）
//   public sayHi() {
//     this.name;
//     console.log("hi");
//   }
// }

// class Person {
//   // 对象里面的就属于类内部
//   private name: string; // 如果没有给他制定访问类型，默认是public允许访问（内部 外部）
//   public sayHi() {
//     this.name;
//     console.log("hi");
//   }
// }

// class Person {
//   // 对象里面的就属于类内部
//   protected name: string; // 如果没有给他制定访问类型，默认是public允许访问（内部 外部）
//   public sayHi() {
//     this.name;
//     console.log("hi");
//   }
// }

// class Teacher extends Person {
//   public sayBye() {
//     this.name;
//   }
// }
// 对象外就属于类外部
// const person = new Person();
// person.name = "xiao";
// console.log(person.name);
// person.sayHi();

// constructor
// Person再被实例化的时候constructor方法会被自动执行
// class Person {
//   // 传统写法
//   // public name: string;
//   // constructor(name: string) { // 这里接受实例化传过来的属性，并且就这个属性对name进行赋值
//   //   this.name = name;
//   // }

//   // 简化写法
//   constructor(public name: string) {}
// }

// const person = new Person("xiaoxiao");
// console.log(person.name);

class Person {
  constructor(public name: string) {}
}
// 如果继承了父类的子类要写一个构造器，那么子类要手动的调用一下父类的构造器
class Teacher extends Person {
  constructor(public age: number) {
    super("xiaoxiao"); // 调用父类的同时，还要按照父类的要求把参数传过去
  }
}

const teacher = new Teacher(22);
console.log(teacher.age);
console.log(teacher.name);
