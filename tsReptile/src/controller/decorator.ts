import { Router, RequestHandler } from "express";
export const router = Router();

enum Method {
  get = "get",
  post = "post"
}
export function controller(target: any) {
  for (let key in target.prototype) {
    const path = Reflect.getMetadata("path", target.prototype, key);
    const method: Method = Reflect.getMetadata("method", target.prototype, key);
    const handler = target.prototype[key];
    const middleware = Reflect.getMetadata("middleware", target.prototype, key);
    if (path && method && handler) {
      console.log(path, method, handler);
      if (middleware) {
        router[method](path, middleware, handler);
      } else {
        router[method](path, handler);
      }
    }
  }
}

// 定义工厂模式来统一一样的代码
function getRequestDecorator(type: string) {
  return function(path: string) {
    return function(target: any, key: string) {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", type, target, key);
    };
  };
}

// 中间件
export function use(middleware: RequestHandler) {
  return function(target: any, key: string) {
    Reflect.defineMetadata("middleware", middleware, target, key);
  };
}

export const get = getRequestDecorator("get");
export const post = getRequestDecorator("post");

// export function get(path: string) {
//   return function(target: any, key: string) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "get", target, key);
//   };
// }

// export function post(path: string) {
//   return function(target: any, key: string) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "post", target, key);
//   };
// }
// export { controller, get, router };
