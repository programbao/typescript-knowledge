// type annotation 类型注解，我们来告诉TS变量是什么类型
// type inference 类型推断， TS会自动的去尝试分析变量的类型
// 如果 TS 能够自动分析变量类型，我们就什么也不需要做了
// 如果TS 无法分析变量类型的话，我们就需要使用类型注解

let count: number;
count = 123;

// 下面这些定义都说明了这些变量可以自动辨别类型，不需要类型注解
// const firstNumber = 1;
// const secondNumber = 2;
// const total = firstNumber + secondNumber;

function getTotal(firstNumber: number, secondNumber: number) {
  return firstNumber + secondNumber;
}

let total = getTotal(1, 2);

const obj = {
  name: "xiaoxiao",
  age: 18
};

// 写TS的时候我们是希望每个变量每个属性的类型是固定的，所以有两种方式
// 默认ts会推断出是什么属性，如果推断不出的话，例如：方法推断不出就要手动的进行类型注解
