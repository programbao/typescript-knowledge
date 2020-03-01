// const userInfo: any = undefined; // 这里没有name属性

// // 通过工厂模式进行传参
// function catchError(msg: string) {
//   return function(target: any, key: string, descriptor: PropertyDescriptor) {
//     const fn = descriptor.value; // 这里就是方法
//     descriptor.value = function() {
//       try {
//         fn();
//       } catch {
//         console.log(msg);
//       }
//     };
//   };
// }

// class Test {
//   //如果原本属性没有name，如果点出来会报错，所以可以通过错误来处理
//   @catchError("userInfo.name 不存在")
//   getName() {
//     return userInfo.name;
//   }
//   @catchError("userInfo.age 不存在")
//   getAge() {
//     return userInfo.age;
//   }
//   // getAge() {
//   //   try {
//   //     return userInfo.age;
//   //   } catch {
//   //     console.log("userInfo.age 不存在");
//   //   }
//   // }
// }

// const test = new Test();
// test.getName();
// test.getAge();
