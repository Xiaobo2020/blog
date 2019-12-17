## Base
```bash
# 版本信息
docker version

# 基本信息
docker info

# 登录
docker login
```

## Image 相关
```bash
# image 相关命令帮助命令
docker image --help

# 查看当前所有 image 信息
docker image ls -a

# 移除指定 image
docker image rm [imageId]

# 拉取指定 image
docker image pull [repository]/[imageName]:[tag]

# 推送指定 image 到指定仓库
docker image push -t [imageName]:[tag] [repository]/[imageName]:[tag]

# 删除无效 image
docker image prune
```

## Container 相关
```bash
# container 相关命令帮助命令
docker container --help

# 查看 container 
docker container ls -a

# 关停指定 contaienr (graceful)
docker container stop [containerName/containerId]

# 杀死指定 container (violent)
docker container kill [containerName/containerId]

# 移除指定 contaienr
docker container rm [containerName/containerId]

# 启动容器，附带常用参数选项
docker container run \
  -it \ # 容器的 shell 映射到当前的 shell, 是 -i 和 -p 的合并写法
  --rm \ # 容器关闭后自动删除
  --name [containerName] \ # 命名当前容器
  --volume [localPath]:[containerPath] \ # 挂载路径映射
  --publish [localPort]:[containerPort] \ # 端口映射，也可以 -p
  [imageName] # 容器使用的镜像名
```
