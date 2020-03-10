"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var randomSignature_1 = require("./randomSignature");
/**
 * @param payload 载荷
 * @param privateKey 密钥/签名
 *
 * */
var privateKey = randomSignature_1.randomSignature(100);
// 生成token
function createToken(payload) {
    console.log(privateKey);
    return jsonwebtoken_1.default.sign(payload, privateKey);
}
exports.createToken = createToken;
function verifyToken(token) {
    return new Promise(function (resolve, reject) {
        resolve(jsonwebtoken_1.default.verify(token, privateKey));
    });
}
exports.verifyToken = verifyToken;
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
