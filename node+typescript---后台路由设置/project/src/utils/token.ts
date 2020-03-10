import jwt from "jsonwebtoken";
import { randomSignature } from "./randomSignature";
/**
 * @param payload 载荷
 * @param privateKey 密钥/签名
 *
 * */
const privateKey = randomSignature(100);
// 生成token
export function createToken(payload: string | object | Buffer) {
  console.log(privateKey);
  return jwt.sign(payload, privateKey);
}

export function verifyToken(token: string) {
  return new Promise((resolve, reject) => {
    resolve(jwt.verify(token, privateKey));
  });
}

// console.log(privateKey)
// let token = createToken({
//   name: "xiaoxiaobao",
//   pwd: 134,
//   exp: Math.floor(Date.now() / 1000) + 60*60
// });
// verifyToken(token)
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err.message);
//   });
