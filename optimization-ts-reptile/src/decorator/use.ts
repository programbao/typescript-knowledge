import { RequestHandler } from "express";
import "reflect-metadata";
import { CrowllerController, LoginController } from "../controller";

// 中间件
export function use(middleware: RequestHandler) {
  return function(target: CrowllerController | LoginController, key: string) {
    Reflect.defineMetadata("middleware", middleware, target, key);
  };
}
