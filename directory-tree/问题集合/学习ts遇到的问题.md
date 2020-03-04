# 学习ts遇到的问题

###  day01

####  npm安装问题

如果package.json 配置文件中 name的名称和npm安装的包名称一样的话，npm会拒绝安装，例如：

![1582941401502](C:\Users\xiaoxiaobao\AppData\Roaming\Typora\typora-user-images\1582941401502.png)

上面这个，如果npm install typescript时会报：Refusing to install package with name "typescript" under a package  （拒绝安装在包为typescript名下），所以这时就要改package.json中name的名字了，随便改个就行；例如将：typescript ---> ts ,在安装就行了



#### npm run 的问题

如果配置(package.json)中没有跑对应的脚本就会报缺失脚本(missing script: xx),例如初始化package.json 中没有npm run dev 这个，他就会报 missing script: dev



### css 样式的问题

下次使用calc的时候，直接选中要用的区域看下有多高，然后选中最外层的父盒子，然后两者相减得出来的就是calc减掉的数字