### 引入fs和path问题

+ 由于fs和path是node中的内置模块，而node大部分都是js编写的语言，如果在ts直接引入的话会报‘找不到模块’；所以需要一个中间解析类型文件，所以要安装@types/node 才能起效，还有默认node是不支持import引入的，支持require

+ 编译时： 

  1. 如果报Module '"fs"' has no default export.和Module '"path"' can only be default-imported using the 'esModuleInterop' flag时，说明导入引起错误了，下面这样导入会错，因为fs模块里面默认是export = 导出的，而不是export default = 导出的；

     ![image-20200304093719500](C:\Users\xiaoxiaobao\AppData\Roaming\Typora\typora-user-images\image-20200304093719500.png)

     解决1：

     ​	要不就是在内置模块中加上default---内置模块不给更改，所以这样给不现实；

     解决2：import * as fs from 'fs'  全部导出fs方法

     ​                     	![image-20200304094053809](C:\Users\xiaoxiaobao\AppData\Roaming\Typora\typora-user-images\image-20200304094053809.png)

     参考GitHub上的解答：[Module 'xxx' has no default export](https://github.com/xcatliu/typescript-tutorial/issues/19)

+ ts中引模板问题

  1. 先判断要参数使用的类型是属于哪个模块的，然后在引入，例如：

     ![image-20200304112316953](C:\Users\xiaoxiaobao\AppData\Roaming\Typora\typora-user-images\image-20200304112316953.png)

  2. 怎么引入对应参数的类型呢？

     很简单：直接在vs-code 中按住Ctrl，然后鼠标箭头指向使用参数的函数；

     ![image-20200304112751359](C:\Users\xiaoxiaobao\AppData\Roaming\Typora\typora-user-images\image-20200304112751359.png)

     如上图：对应的参数类型就会出来，然后对应的直接复制粘贴过来就行；如果要想知道为什么是这样，可以自行的点击fs.stat进去看编程代码。

     ![image-20200304113148741](C:\Users\xiaoxiaobao\AppData\Roaming\Typora\typora-user-images\image-20200304113148741.png)

+ 在使用forEach时，forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。

  **注意:** forEach() 对于空数组是不会执行回调函数的。