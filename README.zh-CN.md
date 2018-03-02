[English](./README.md) | 简体中文

# GMS

[![](https://img.shields.io/travis/ant-design/ant-design-pro.svg?style=flat-square)](https://travis-ci.org/ant-design/ant-design-pro) [![Build status](https://ci.appveyor.com/api/projects/status/67fxu2by3ibvqtat/branch/master?svg=true)](https://ci.appveyor.com/project/afc163/ant-design-pro/branch/master) [![Gitter](https://badges.gitter.im/ant-design/ant-design-pro.svg)](https://gitter.im/ant-design/ant-design-pro?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

一个用[antd-pro](http://pro.ant.design)以及 Koa 搭建的个人管理系统。

![](https://gw.alipayobjects.com/zos/rmsportal/xEdBqwSzvoSapmnSnYjU.png)

## 特性

* :gem: **优雅美观**：基于 Ant Design 体系设计
* :1234: **Mock 数据**：实用的本地数据调试方案
* :rocket: **最新技术栈**：前端使用 React/dva/antd 服务端使用 koa2
* :iphone: **响应式**：针对不同屏幕大小设计
* :bookmark: **良好的日志**：log4js 和 pm2 共同确保日志完整
* :fire: **全面**：提供工作和生活中的全面功能(博客管理，待办任务，生活账单等)

## 功能目录

```
- Dashboard
  - 分析页
  - 监控页
  - 工作台
- 博客管理
  - 新建博客
  - 草稿箱
  - 标签管理
  - 博文管理
更多...
```

## 使用

```bash
# 使用 roadhogrc 模拟数据启动
$ git clone https://github.com/gatinul/GMS.git
$ cd GMS
$ npm install
$ npm start         # 访问 http://localhost:8000
```

也可以使用服务端真实数据启动（Koa）

```bash
# 确保你已写好服务端代码以获取数据
$ git clone https://github.com/gatinul/GMS.git
$ cd GMS
$ npm install
$ npm start         # 访问 http://localhost:3001
```

更多信息请参考 [使用文档](http://pro.ant.design/docs/getting-started)。

## 兼容性

现代浏览器及 IE11。
