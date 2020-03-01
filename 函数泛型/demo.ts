// 泛型 generic 泛指的类型
// 对于不确定的泛指类型，可以给参数一个泛型的语法 在使用的时候在指定类型
function join<ABC>(first: ABC, sencond: ABC) {
  return `${first}${sencond}`;
}
join<number>(1, 1);
