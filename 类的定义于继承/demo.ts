class Person {
  name = "xiao";
  getName() {
    return this.name;
  }
}

// 继承  子类可以对父类进行重写
class Teacher extends Person {
  getTeacherName() {
    return "teacher";
  }
  getName() {
    return super.getName() + "bao"; // 这里的super可以理解为父类 .getName() 表示调用父类
    // super 通常是用来，如果子类覆盖了父类的属性和方法是，可以用super类重新调用父类的方法属性
    // return "bao";
  }
}
const person = new Person(); // 实例化
const teacher = new Teacher();
console.log(person.getName());
console.log(teacher.getTeacherName());
console.log(teacher.getName());
