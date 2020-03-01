// class Person {
//   public readonly name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }

// // 抽象类 abstract
// abstract class Geom {
//   abstract getArea(): number;
//   getType() {
//     return "gemo";
//   }
// }
// // 抽象类智能被继承，不能被实例
// // const ab = new Geom() 这个是错误的

// // 如果子类继承了抽象父类，里面有抽象方法的话，必须要实现一下
// class Cirtcle extends Geom {
//   getArea() {
//     return 234
//   }
// }

interface Person {
  name: string;
}
interface Teacher extends Person {
  teachingAge: number;
}
interface Student extends Person {
  name: string;
  age: number;
}
const teacher = {
  name: "bao",
  teachingAge: 89
};
const student = {
  name: "xiao",
  age: 18
};
const getUserInfo = (user: Person) => {
  console.log(user.name);
};

getUserInfo(teacher);
getUserInfo(student);
