import mongoose from "mongoose";
mongoose.connect("mongodb://localhost/nodeTypescript", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection; // 数据库的连接对象 --- 本人理解：应该是nodeTypescipt库
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connect db ok");
});
