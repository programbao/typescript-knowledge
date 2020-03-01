import "reflect-metadata";
/**
 * defineMetadata 定义元数据
 * hasMetadata 是否有没有元数据
 * hasOwnMetadata 本身是否有元数据
 * getMetadataKeys 列出有多少个元数据
 * deleteMetadata 删除元数据
 * */

// const user = {
//   name: "xiaoxiaobao"
// };

// /**
//  * 1. 参数一：metadataKey: any, 元数据的key
//  * 2. 参数二：metadataValue: any, 元数据对应的key的值
//  * 3. 参数三：target: Object 要存储的对象
//  *
//  * */

// Reflect.defineMetadata("data", "test", user);
// // console.log(user); // 打印没有data数据
// // 基础获取元数据
// console.log(Reflect.getMetadata("data", user));

// 类上装饰
// @Reflect.metadata("data", "test")
// class User {
//   name = "xiaoxiaobao";
// }
// console.log(Reflect.getMetadata("data", User));

// // 属性上装饰
// class User {
//   @Reflect.metadata("data", "test")
//   name = "xiaoxiaobao";
// }
// console.log(Reflect.getMetadata("data", User.prototype, "name"));

// 在方法上装饰
// 属性上装饰
// class User {
//   @Reflect.metadata("data", "test")
//   getName() {}
// }
// class Teacher extends User {}
// console.log(Reflect.getMetadata("data", User.prototype, "getName"));
// console.log(Reflect.hasMetadata("data", User.prototype, "getName"));
// console.log(Reflect.hasMetadata("data", Teacher.prototype, "getName"));
// console.log(Reflect.hasOwnMetadata("data", Teacher.prototype, "getName"));
// console.log(Reflect.getMetadataKeys(User.prototype, "getName"));
