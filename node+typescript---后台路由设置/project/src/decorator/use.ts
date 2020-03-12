import { RequestHandler } from "express";
import "reflect-metadata";

export function use(middlewareName: string, middleware: RequestHandler) {
  return function(target: any, key: string) {
    Reflect.defineMetadata(middlewareName, middleware, target, key);
  };
}
