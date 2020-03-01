// 下面这段代码表示Home命名空间对象依赖于component文件
/// <reference path='./component.ts' />
// 命名空间
namespace Home {
  export class Page {
    User: Components.User = {
      name: "xiao"
    };
    constructor() {
      new Components.Header();
      new Components.Content();
      new Components.Footer();
    }
  }
}
