// 下面这两个有同样的person，其实可以用接口的形式来表示类型集合
// const getPersonName = (person: { name: string }) => {
//   console.log(person.name);
// };
// const setPersonName = (person: { name: string }, name: string) => {
//   person.name = name;
// };
var getPersonName = function (person) {
    console.log(person.name);
};
var setPersonName = function (person, name) {
    person.name = name;
};
var perosn = {
    name: "xiao",
    age: 18,
    say: function () {
        return "say hello";
    },
    teach: function () {
        return "bao";
    }
};
getPersonName(perosn); // 没有强校验
// getPersonName({
//   name: "xiao",
//   sex: "xiaoxiao",
//   say() {
//     return 'say hello'
//   }
// }); // 如果直接传递字面量，而且字面量里面有接口没有定义的属性，这时候ts就会进行强校验
setPersonName(perosn, "sdkl");
// 表示User应用接口Person的属性，当应用是必须具备接口里面的属性和方法
var User = /** @class */ (function () {
    function User() {
        this.name = "xiao";
    }
    User.prototype.say = function () {
        return "xiaobao";
    };
    return User;
}());
var say = function (word) {
    return word;
};
// 总结： interface 和type相似
