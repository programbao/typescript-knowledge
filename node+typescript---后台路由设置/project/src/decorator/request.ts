import "reflect-metadata";

// 枚举列举请求方法
enum methods {
  get = "get",
  post = "post",
  delete = "delete"
}
/**
 * 创建工厂模式函数，总共要三层函数包装
 * 第一层：本函数（本文件）调用，传递方法methods
 * 第二层：在装饰的函数上使用，传递path路由路径
 * 第三层：定义元数据
 * */
function request(methods: string) {
  return function(path: string) {
    return function(target: any, key: string) {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", methods, target, key);
    };
  };
}
// 创建路由请求对象
export const get = request(methods.get);
export const post = request(methods.post);
export const del = request(methods.delete);
