### TypeScript 定义

1.  ts 是 js 的超级，而且 ts 拥有类型机制

- es6 是 es5 的超级，ts 是 js(包过 es6 和 es5)的超级，在兼用 es 的语法上扩展他独有的属性特性
  ts 有自己的 type 类使用---静态类使用

2.  不会直接在浏览器上执行，要被编译后才执行

### TypeScript 优势

1.  开发过程中，发现潜在问题
2.  更友好的编辑器自动提示
3.  代码语义更清晰易懂

### ts 静态类型

理解：核心：定义了一个类，不仅说明了他的类型不能修改，同时他的属性和方法也确定了

### 类型复习

#### 基础类型

1.  有 boolean,number ,string, void, undfined, symbol ,null

#### 对象类型

1.  有，{}, Class, function, []

```
const func = (str: string) => {}
const func1:(str: string) => number = (str) => {
  retrun parseInt(str, 10)
}
const date = new Date()
```

#### 其他的 case

```
  interface Person {
    name: 'string'
  }
  const rawData = '{"name": "xiaoxiao"}'
  const newData: Person = JSON.parse(rawData)

  let temp: number | string = 123
  temp = '456'
```
