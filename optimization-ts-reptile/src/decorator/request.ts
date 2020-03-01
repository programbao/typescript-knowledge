import { RequestHandler } from "express";
import { CrowllerController, LoginController } from "../controller";
enum Methods {
  get = "get",
  post = "post"
}

// 定义工厂模式来统一一样的代码
function getRequestDecorator(type: Methods) {
  return function(path: string) {
    return function(target: CrowllerController | LoginController, key: string) {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", type, target, key);
    };
  };
}

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);
