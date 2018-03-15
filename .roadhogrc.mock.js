import mockjs from "mockjs";
import { getRule, postRule } from "./mock/rule";
import { getActivities, getNotice, getFakeList } from "./mock/api";
import { getFakeChartData } from "./mock/chart";
import { imgMap } from "./mock/utils";
import { getProfileBasicData } from "./mock/profile";
import { getProfileAdvancedData } from "./mock/profile";
import { getNotices } from "./mock/notices";
import { format, delay } from "roadhog-api-doc";

// 是否禁用代理
const noProxy = process.env.NO_PROXY === "true";

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  "POST /api/currentUser": {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: "分页",
        exp: 2
      }
    },
    $body: {
      name: "Gatinul",
      avatar: "static/avatar.png",
      userid: "00000001",
      notifyCount: 12
    }
  },
  // GET POST 可省略
  "GET /api/users": [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park"
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park"
    }
  ],
  "POST /blog/getDraft": {
    success: true,
    message: [
      {
        id: 26,
        blog_title: "Hello Gatinul",
        blog_desc: "> 2018 02 11",
        blog_content: "> 2018 02 11\n\n\n测试博客保存是否好用",
        likes: null,
        views: null,
        hot: null,
        create_time: "2018-02-11T08:36:25.000Z",
        update_time: null,
        status: "0"
      }
    ]
  },
  //7FFF00 1 FFD700 2 EE7942 3 E4393C 4
  "GET /reminder/getReminderWeek": [
    {
      id: "1",
      content: "早检",
      date: "2018-3-8 06:30:00",
      level: 4,
      color: "#E4393C"
    },
    {
      id: "2",
      content: "大数据展示的ppt",
      date: "2018-3-9 17:30:00",
      level: 3,
      color: "#EE7942"
    },
    {
      id: "3",
      content: "打篮球",
      date: "2018-3-10 11:30:00",
      level: 1,
      color: "#7FFF00"
    }
  ],
  "GET /blog/getTags": {
    success: false,
    message: ""
  },
  "GET /blog/getTagColor": {
    success: true,
    message: [
      {
        id: 1,
        color: "#9F5E21",
        remark: ""
      },
      {
        id: 2,
        color: "#e439ec",
        remark: ""
      }
    ]
  },
  "GET /api/project/notice": getNotice,
  "GET /api/activities": getActivities,
  "GET /api/rule": getRule,
  "POST /api/rule": {
    $params: {
      pageSize: {
        desc: "分页",
        exp: 2
      }
    },
    $body: postRule
  },
  "POST /api/forms": (req, res) => {
    res.send({ message: "Ok" });
  },
  "GET /api/tags": mockjs.mock({
    "list|100": [{ name: "@city", "value|1-100": 150, "type|0-2": 1 }]
  }),
  "GET /api/fake_list": getFakeList,
  "GET /api/fake_chart_data": getFakeChartData,
  "GET /api/profile/basic": getProfileBasicData,
  "GET /api/profile/advanced": getProfileAdvancedData,
  "POST /api/login/account": (req, res) => {
    const { password, userName, type } = req.body;
    if (password === "888888" && userName === "admin") {
      res.send({
        status: "ok",
        type,
        currentAuthority: "admin"
      });
      return;
    }
    if (password === "123456" && userName === "user") {
      res.send({
        status: "ok",
        type,
        currentAuthority: "user"
      });
      return;
    }
    res.send({
      status: "ok",
      type,
      currentAuthority: "gatinul"
    });
  },
  "POST /api/register": (req, res) => {
    res.send({ status: "ok", currentAuthority: "user" });
  },
  "GET /api/notices": getNotices,
  "GET /api/500": (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: "error",
      message: "error",
      path: "/base/category/list"
    });
  },
  "GET /api/404": (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: "Not Found",
      message: "No message available",
      path: "/base/category/list/2121212"
    });
  },
  "GET /api/403": (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: "Unauthorized",
      message: "Unauthorized",
      path: "/base/category/list"
    });
  },
  "GET /api/401": (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: "Unauthorized",
      message: "Unauthorized",
      path: "/base/category/list"
    });
  }
};
export default (noProxy ? {} : delay(proxy, 1000));
