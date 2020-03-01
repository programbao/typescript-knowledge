// const Status = {
//   OFFLINE: 0,
//   ONLINE: 1,
//   DELETED: 2
// };
// function getResult(status) {
//   if (status === Status.OFFLINE) {
//     return "offline";
//   } else if (status === Status.ONLINE) {
//     return "online";
//   } else if (status === Status.DELETED) {
//     return "deleted";
//   }
//   return "error";
// }

// 枚举类型 --- enum --- 解决状态的问题
// 默认第一个从0开始，如果给其中一个赋值的话，赋值下面的就从这个数开始算，上面的保持原样
enum Status {
  OFFLINE,
  ONLINE,
  DELETED
}

function getResult(status) {
  if (status === Status.OFFLINE) {
    return "offline";
  } else if (status === Status.ONLINE) {
    return "online";
  } else if (status === Status.DELETED) {
    return "deleted";
  }
  return "error";
}
console.log(Status.OFFLINE);
console.log(Status.ONLINE);
console.log(Status.DELETED);
const result = getResult(2);
console.log(result);
