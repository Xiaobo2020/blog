## TODO

<!-- 网络相关 -->
+ [x] 浏览器的缓存原理（强缓存、弱缓存、GMT时间）
+ [x] DNS解析逻辑
+ [x] cdn原理
+ [] 跨域问题的原因、解决方案
+ [] 安全（xss、csrf、ssrf）
+ [] xss如何防御，前端后端谁做，如何做
+ [] csrf如何防御，同源策略解决了什么问题
+ [] 跨站脚本注入和请求伪造
+ [] http状态码
+ [] http和https的区别
+ [] https有什么好处，握手过程，如何做到安全
+ [] http/1.0、http/1.1、http/2.0简单了解各个特点
+ [] 优化页面：首屏渲染时间、观察内存占用
+ [] TCP和UDP的区别
+ [] 用户输入url到结果展示（详细说明各个步骤）
+ [] 前端性能优化（网络、浏览器渲染、框架）

<!-- react相关 -->
+ [] redux原理、实现、中间件的实现
+ [] redux-thunk的实现原理，异步action
+ [] react-redux的原理（context、hoc、反向继承）
+ [] Fiber原理、事件调度（requestIdleCallback）
+ [] hooks使用及原理
+ [] 使用hook写一个鉴权组件，所有的其他组件都要经过验证。auth是promise
+ [] 为什么请求要在useEffect中？放在里面和外面有什么区别？内部如何使用async/await
+ [] useLayoutEffect和useEffect具体执行时机
+ [] 手写一个时间选择组件，先设计props，外部组件如何使用（组件封装）
+ [] React生命周期，包括新旧
+ [] React性能优化
+ [] PureComponent和Component的区别
+ [] setState原理
+ [] diff算法及原理（vue和react的区别）
+ [] virtual dom

<!-- JS相关 -->
+ [] 手写ajax
+ [] 手写JSONP（promise版本），window上挂的函数如何避免重名
+ [] promise的使用和实现
+ [] async/await和promise的性能差异
+ [] this
+ [] 闭包
+ [] 箭头函数
+ [] const obj的属性如何不可改变 freeze
+ [] 原型链、继承
+ [] 装饰器
+ [] 防抖和节流
+ [] 数组的判断方法
+ [] instanceof
+ [] 正则基本内容
+ [] 常用设计模式：订阅发布模式、事件监听、单例模式
+ [] base64 前端如何转化
+ [] 文件如何上传，除了input还有什么方法
+ [] 类数组的数据结构，如何转化为数组
+ [] 无限滚动
+ [] 隐式转换：valueOf、toString
+ [] CommonJS和ES6模块化有什么区别，设计一个方法，使CommonJS到处的模块也能改变其内部变量
+ [] forOf原理
+ [] 实现深拷贝，能处理引用类型，变量类型判断、创建各种变量方法
+ [] e.target和e.currentTarget

<!-- css相关 -->
+ [] 居中方式
+ [] position有哪些，作用
+ [] flex布局（justify-content和align-item）
+ [] BFC是什么
+ [] 盒子模型
+ [] 清除浮动

<!-- html相关 -->
+ [] viewport、meta、manifest
+ [] document.ready、window.onload
+ [] onload怎么使用

<!-- 工程化相关 -->
+ [] webpack plugin的实现与应用
+ [] 懒加载
+ [] webpack treeShaking原理，靠什么才能实现（ES6模块的静态导出）
+ [] webpack构建原理，plugin和loader的区别

<!-- 算法相关 -->
+ [] 快速排序算法原理及实现

## TMP

+ mobx - 装饰器
+ 根据id获取dom，根据class获取dom

## 文件上传

+ 文件格式校验
+ 文件切片
+ 唯一性校验
+ 上传异步并发数
+ 错误重试 + 三次终止
+ 卡顿：web-worker、requestIdleCallback




1. axios.post + 上传进度条 + 后端node接收文件
2. 拖拽、粘贴
3. 分片 断点续传
4. 如何限制只能上传png
  1. split()
  2. 二进制流
5. web-worker
6. 时间切片：fiber requestIdleCallback
7. chouyang 
8. 文件切片数量过多，上传请求过多，导致卡顿：异步并发数量
9. 报错重试、三次终止所有切片
10. 每个切片大小如何控制
11. 手机端网速动态调整包大小、TCP协议的慢启动
12. 并发数 + 包控制如何实现


1. DNS
2. 建立TCP链接 发请求
3. 后端接收请求，读文件，读数据库，获取网络接口，返回数据、页面
4. 前端接收html渲染页面
    1. html - dom
    2. css - css tree
    3. dom + css tree - render tree
    4. 渲染页面
5. 执行js

1. 网络协议
    1. TCP IP HTTP HTTPS DNS啥关系
    2. http的缓存
2. 浏览器的渲染机制
    1. how browser works
3. 框架执行的侧面
4. V8
5. 性能优化

github.com/shengxinjing