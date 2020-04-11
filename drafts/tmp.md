+ 强缓存、弱缓存
+ react-redux - hoc、反向继承
+ mobx - 装饰器
+ 快速排序
+ 同源策略
+ https
+ docker配置开发环境
+ 根据id获取dom，根据class获取dom
+ Context 原理
+ Fiber 原理

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