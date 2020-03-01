// numberArr 是数组类型而且每一项都是数字
const numberArr: number[] = [1, 2, 3];
// 这里的numberArr 标识是数组类型而且数组中的内容既可以是数字类型，也可以是字符串类型
const numberArr1: (number | string)[] = [1, 2, "3"];
const undefinedArr: undefined[] = [undefined]; //这里表示里面的内容只能是undefined 类型

// 这里表示objectArr只能是对象类型，而且内容只能是包涵name的对象，其他不行
// const objectArr: { name: string }[] = [
//   {
//     name: "xiaoxiao"
//   }
// ]; // 正确
// const objectArr: { name: string }[] = [
//   {
//     name: "xiaoxiao",
//     age: 28
//   } // 错误
// ];
// const objectArr: { name: string; age: number }[] = [
//   {
//     name: "xiaoxiao",
//     age: 18
//   }
// ];

// ==== 一个概念： type alias 类型别名
// type User = { name: string; age: number };
// const objectArr: User[] = [
//   {
//     name: "xiaoxiao",
//     age: 18
//   }
// ];

// ========
class Teacher {
  name: string;
  age: number;
}
const objectArr: Teacher[] = [
  new Teacher(),
  {
    name: "xiaoxiao",
    age: 18
  }
]; // 这里是说数组里面的内容必须满足类Teacher里面的内容
//  这里之所以可以，是说明TS 不要求类对象 使用一定要new出来，数组里面满足类对象的内容也是可以的

// 元组 tuple ---- 元组里面指定对应的类型
const teacherInfo: [string, string, number] = ["xiao", "male", 18];
// csv
const teacherList: [string, string, number][] = [
  ["wo", "male", 12],
  ["xiaoxiaobao", "famale", 14],
  ["xiaowo", "male", 17]
];
