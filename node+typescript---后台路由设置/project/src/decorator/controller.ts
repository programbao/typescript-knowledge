import router from "../router";

enum methods {
  get = "get",
  post = "post"
}

export function controller(target: any) {
  for (const key in target.prototype) {
    const path = Reflect.getMetadata("path", target.prototype, key);
    const method: methods = Reflect.getMetadata(
      "method",
      target.prototype,
      key
    );
    const checkLoginMiddleware = Reflect.getMetadata(
      "checkLogin",
      target.prototype,
      key
    );
    const checkTokenMiddleware = Reflect.getMetadata(
      "checkToken",
      target.prototype,
      key
    );
    // 判断是否有中间件
    if (checkLoginMiddleware && checkTokenMiddleware) {
      router[method](
        path,
        checkLoginMiddleware,
        checkTokenMiddleware,
        target.prototype[key]
      );
    } else if (checkLoginMiddleware) {
      router[method](path, checkLoginMiddleware, target.prototype[key]);
    } else if (checkTokenMiddleware) {
      router[method](path, checkTokenMiddleware, target.prototype[key]);
    } else {
      router[method](path, target.prototype[key]);
    }
  }
}
