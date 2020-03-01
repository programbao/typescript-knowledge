// 基础类型number, string, null, undefined, symbol, boolean, void
const count: number = 123;
const teachername: string = "xiaoxiaobao";

// 对象类型
class Person {}
const teacher: {
  name: string;
  age: number;
} = {
  name: "xiaoxiao",
  age: 18
};

const numbers: number[] = [1, 2, 3];

const xiao: Person = new Person();

const getTotal: () => number = () => {
  return 123;
};
