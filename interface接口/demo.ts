// 下面这两个有同样的person，其实可以用接口的形式来表示类型集合
// const getPersonName = (person: { name: string }) => {
//   console.log(person.name);
// };
// const setPersonName = (person: { name: string }, name: string) => {
//   person.name = name;
// };

// 例如：
interface Person {
  // readonly name1: string; // 只读 表示使用的时候表示只能读，不能使用修改
  name: string;
  age?: number;
  [propName: string]: any; // 这里表示接口处理其他属性，而且可以多出其他属性
  say(): string;
}

// 接口还可以继承
// 表示Teacher 继承Person 里面的接口属性和方法，同时还可以扩展自身的方法
interface Teacher extends Person {
  teach(): string;
}

// 接口还可以定义一个函数
// 表示函数是SayHi 函数必须接受一个字符串参数为word，返回值也是string
interface SayHi {
  (word: string): string;
}

// 如果表示一个属性表示可有可无的情况下
// 可以这样写 --- 加问号
// interface Person6 {
//   name: string;
//   age?: number;
// }
type Person1 = string; // 接口和类型别名有点相似，但是又有点不同，别名可以直接指向一个类型，而接口直接指向一个对象
const getPersonName = (person: Person) => {
  console.log(person.name);
};
const setPersonName = (person: Teacher, name: string) => {
  person.name = name;
};

const perosn = {
  name: "xiao",
  age: 18,
  say() {
    return "say hello";
  },
  teach() {
    return "bao";
  }
};
getPersonName(perosn); // 没有强校验
// getPersonName({
//   name: "xiao",
//   sex: "xiaoxiao",
//   say() {
//     return 'say hello'
//   }
// }); // 如果直接传递字面量，而且字面量里面有接口没有定义的属性，这时候ts就会进行强校验
setPersonName(perosn, "sdkl");

// 表示User应用接口Person的属性，当应用是必须具备接口里面的属性和方法
class User implements Person {
  name = "xiao";
  say() {
    return "xiaobao";
  }
}

const say: SayHi = (word: string) => {
  return word;
};

// 总结： interface 和type相似
