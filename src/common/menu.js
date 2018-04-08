import { isUrl } from "../utils/utils";
import request from "../utils/request";
import axios from "axios";
// 应该把整个 menuData 动态获取 即可 绑定到BasicLayouts 里
const menuData = [
  {
    name: "管理中心",
    icon: "dashboard",
    path: "dashboard",
    children: [
      {
        name: "工作台",
        path: "workplace"
        // hideInMenu: true,
      }
    ]
  },
  {
    name: "博客管理",
    icon: "book",
    path: "blog",
    authority: ["admin", "gatinul", "rebecca","wenzy"],
    children: [
      {
        name: "新建博客",
        path: "new",
        authority: ["admin", "gatinul", "rebecca","wenzy"]
      },
      {
        name: "草稿箱",
        path: "draft",
        authority: ["admin", "gatinul", "rebecca","wenzy"]
      },
      {
        name: "标签管理",
        path: "tag",
        authority: ["admin", "gatinul","wenzy"]
      },
      {
        name: "博文管理",
        path: "manage",
        authority: ["admin", "gatinul","wenzy"]
      }
    ]
  },
  {
    name: "任务事项",
    icon: "clock-circle-o",
    path: "task",
    authority: ["admin", "gatinul","wenzy"],
    children: [
      {
        name: "任务管理",
        path: "taskList",
        authority: ["admin", "gatinul","wenzy"]
      }
    ]
  },
];
async function getPower(path) {
  const arr = await yibu(path);
  return arr;
}
function yibu(path) {
  return new Promise((resolve, reject) => {
    axios
      .post("api/getAuthority", {
        path
      })
      .then(res => {
        const arr = [];
        for (let i = 0; i < res.data.length; i++) {
          arr.push(res.data[i].user_name);
        }
        resolve(arr);
      });
  });
}
function formatter(data, parentPath = "", parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority
    };
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority
      );
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
