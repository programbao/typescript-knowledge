import router from "../router";
import { RequestHandler } from "express";
enum Methods {
  get = "get",
  post = "post"
}

export function controller(root: string) {
  return function(target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata("path", target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        "method",
        target.prototype,
        key
      );
      const middleware: RequestHandler = Reflect.getMetadata(
        "middleware",
        target.prototype,
        key
      );
      const handler = target.prototype[key];
      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`;
        console.log(path, method, handler);
        if (middleware) {
          router[method](path, middleware, handler);
        } else {
          router[method](path, handler);
        }
      }
    }
  };
}
