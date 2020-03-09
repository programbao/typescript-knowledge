import mongoose from "mongoose";
import { SchemaDefinition } from "mongoose";

// 初始存入对象
const userModelSchema: SchemaDefinition = {
  username: { type: String, required: true },
  pwd: { type: Number, required: true },
  userAccount: { type: String, required: true },
  college: { type: String, required: true },
  grade: { type: String, required: true },
  state: { type: Number, default: 0 },
  code: { type: Number, default: 0 },
  skill: String
};

const userSchema = new mongoose.Schema(userModelSchema);
const userModel = mongoose.model("users", userSchema); // 初始用户模块对象,并导出
export default userModel;
