#Legible UI

Legible UI 是一个轻量级、语义化的前端 UI 框架。

##<span id="browers">浏览器支持</span>

###PC端

- Chorme 21+
- Firefox 22+
- Safari 6.1+
- Opera 12.1+
- IE 10+

###移动端

- IOS Safari 7.1+
- Android 2.2+
- Chrome(Android)
- UC Browser(Android) 9.9+
- Firefox(Android) 39
- Opera Mini 8
- Opera Mobile 12.1
- IE Mobile 10+

##文件结构
###css/

- legible.core.css

    基础的 CSS UI 样式，不需要加载 JS

- legible.widget.css

    包含一些扩展，需要加载 JS，**包含 legible.core**

###js/

- legible.widget.js

    组件对应的 JS 库，需要 **jQuery** 或者 **Zepto** 的支持。

##依赖于
[Stylus](https://github.com/stylus/stylus "stylus")   
用于快捷开发CSS

[Normalize.css](http://necolas.github.io/normalize.css/ "normalize.css")   
用于保证CSS在浏览器上的表现
