import "reflect-metadata";

function showData(target: typeof User) {
  for (let key in target.prototype) {
    const data = Reflect.getMetadata("data", target.prototype, key);
    console.log(data);
  }
}

// 方法上的装饰器优先于类上的装饰器
// @showData
// class User {
//   @Reflect.metadata("data", "name")
//   getName() {}

//   @Reflect.metadata("data", "age")
//   getAge() {}
// }

function setData(dataKey: string, msg: string) {
  return function(target: User, key: string) {
    Reflect.defineMetadata(dataKey, msg, target, key);
  };
}

@showData
class User {
  @Reflect.metadata("data", "name")
  getName() {}

  @setData("data", "age")
  getAge() {}
}
