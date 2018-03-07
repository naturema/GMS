English | [简体中文](./README.zh-CN.md)

# GMS

[![](https://img.shields.io/travis/ant-design/ant-design-pro/master.svg?style=flat-square)](https://travis-ci.org/ant-design/ant-design-pro) [![Build status](https://ci.appveyor.com/api/projects/status/67fxu2by3ibvqtat/branch/master?svg=true)](https://ci.appveyor.com/project/afc163/ant-design-pro/branch/master) [![Gitter](https://badges.gitter.im/ant-design/ant-design-pro.svg)](https://gitter.im/ant-design/ant-design-pro?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

A manage system build by [antd-pro](http://pro.ant.design) and koa.

![](https://gatinul.org/public/img/gms.png)

## Features

* :gem: **Neat design**: Follow Ant Design specification
* :1234: **Mock development**: Easy to use mock development solution
* :rocket: **Newest development stack**: React/dva/antd for front-end & Koa2 for back-end
* :iphone: **Responsive**: Designed for varies of screen size
* :bookmark: **Solid log**: Log4js and pm2 make logs complete
* :fire: **Comprehensive**: Provide more features for work and life（blog manage,todo,transactions...）

## Menu

```
- Dashboard
  - Analytic
  - Monitor
  - Workspace
- Blog
  - New
  - Draft
  - Tag
  - Manage
...
```

## Usage

```bash
# Use with roadhogrc mock.
$ git clone https://github.com/gatinul/GMS.git
$ cd GMS
$ npm install
$ npm start         # visit http://localhost:8000
```

Or you can use with server (Koa)

```bash
# Make sure the server-side code is written.
$ git clone https://github.com/gatinul/GMS.git
$ cd GMS
$ npm install
$ nodemon app.js         # visit http://localhost:3001
```

More instruction at [documentation]().

## Compatibility

Modern browsers and IE11.

## Todo

1. Get SiderMenu from server(param `authority`) [relative issue](https://github.com/ant-design/ant-design-pro/issues/751)
