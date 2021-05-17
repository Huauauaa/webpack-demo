# 🚀 Welcome to your new awesome project!

## 性能优化

### 开发环境

- 优化打包构建速度
  - HMR
- 优化代码调试
  - source-map

### 生产环境

- 优化打包构建速度
  - oneOf
  - babel 缓存
  - 多进程打包
  - externals(CDN)
  - ddl(先打包好再用)
- 优化代码运行的性能
  - 缓存(hash-chunkhash-contenthash)
  - tree shaking(1 生产环境自动启用 2esModule)
  - code split
  - 懒加载/预加载
  - pwa(navigator.serviceWork)
