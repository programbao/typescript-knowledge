import mongoose from "mongoose";
import { SchemaDefinition } from "mongoose";

// 初始存入对象
const matchModelSchema: SchemaDefinition = {
  matchName: { type: String, required: true },
  time: { type: String, required: true },
  matchType: { type: String, required: true },
  sponsor: { type: String, required: true },
  state: { type: Number, default: 0 }
};

const matchSchema = new mongoose.Schema(matchModelSchema);
const matchModel = mongoose.model("matchs", matchSchema); // 初始用户模块对象,并导出
export default matchModel;
