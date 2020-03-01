"use strict";
var Components;
(function (Components) {
    var SubComponents;
    (function (SubComponents) {
        var Test = /** @class */ (function () {
            function Test() {
            }
            return Test;
        }());
        SubComponents.Test = Test;
    })(SubComponents = Components.SubComponents || (Components.SubComponents = {}));
    var Header = /** @class */ (function () {
        function Header() {
            var elem = document.createElement("div");
            elem.innerText = "This is Header";
            document.body.appendChild(elem);
        }
        return Header;
    }());
    Components.Header = Header;
    var Content = /** @class */ (function () {
        function Content() {
            var elem = document.createElement("div");
            elem.innerText = "This is Content";
            document.body.appendChild(elem);
        }
        return Content;
    }());
    Components.Content = Content;
    var Footer = /** @class */ (function () {
        function Footer() {
            var elem = document.createElement("div");
            elem.innerText = "This is Footer";
            document.body.appendChild(elem);
        }
        return Footer;
    }());
    Components.Footer = Footer;
})(Components || (Components = {}));
// 下面这段代码表示Home命名空间对象依赖于component文件
/// <reference path='./component.ts' />
// 命名空间
var Home;
(function (Home) {
    var Page = /** @class */ (function () {
        function Page() {
            this.User = {
                name: "xiao"
            };
            new Components.Header();
            new Components.Content();
            new Components.Footer();
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));
