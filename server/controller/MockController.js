const moment = require("moment");
const avatars2 = [
  "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
  "https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png",
  "https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png",
  "https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png",
  "https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png",
  "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png",
  "https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png",
  "https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png",
  "https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png",
  "https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png"
];
const visitData = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
      "YYYY-MM-DD"
    ),
    y: fakeY[i]
  });
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
      "YYYY-MM-DD"
    ),
    y: fakeY2[i]
  });
}

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  });
}
const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2)
  });
}
const salesTypeData = [
  {
    x: "家用电器",
    y: 4544
  },
  {
    x: "食用酒水",
    y: 3321
  },
  {
    x: "个护健康",
    y: 3113
  },
  {
    x: "服饰箱包",
    y: 2341
  },
  {
    x: "母婴产品",
    y: 1231
  },
  {
    x: "其他",
    y: 1231
  }
];

const salesTypeDataOnline = [
  {
    x: "家用电器",
    y: 244
  },
  {
    x: "食用酒水",
    y: 321
  },
  {
    x: "个护健康",
    y: 311
  },
  {
    x: "服饰箱包",
    y: 41
  },
  {
    x: "母婴产品",
    y: 121
  },
  {
    x: "其他",
    y: 111
  }
];

const salesTypeDataOffline = [
  {
    x: "家用电器",
    y: 99
  },
  {
    x: "个护健康",
    y: 188
  },
  {
    x: "服饰箱包",
    y: 344
  },
  {
    x: "母婴产品",
    y: 255
  },
  {
    x: "其他",
    y: 65
  }
];

const offlineData = [];
for (let i = 0; i < 10; i += 1) {
  offlineData.push({
    name: `门店${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10
  });
}
const offlineChartData = [];
for (let i = 0; i < 20; i += 1) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10
  });
}

const radarOriginData = [
  {
    name: "个人",
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7
  },
  {
    name: "团队",
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1
  },
  {
    name: "部门",
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7
  }
];

//
const radarData = [];
const radarTitleMap = {
  ref: "引用",
  koubei: "口碑",
  output: "产量",
  contribute: "贡献",
  hot: "热度"
};
radarOriginData.forEach(item => {
  Object.keys(item).forEach(key => {
    if (key !== "name") {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key]
      });
    }
  });
});
module.exports = {
  async notice(ctx) {
    ctx.body = [
      {
        id: "000000001",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
        title: "你收到了 14 份新周报",
        datetime: "2017-08-09",
        type: "通知"
      },
      {
        id: "000000002",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
        title: "你推荐的 曲妮妮 已通过第三轮面试",
        datetime: "2017-08-08",
        type: "通知"
      },
      {
        id: "000000003",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png",
        title: "这种模板可以区分多种通知类型",
        datetime: "2017-08-07",
        read: true,
        type: "通知"
      },
      {
        id: "000000004",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
        title: "左侧图标用于区分不同的类型",
        datetime: "2017-08-07",
        type: "通知"
      },
      {
        id: "000000005",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
        title: "内容不要超过两行字，超出时自动截断",
        datetime: "2017-08-07",
        type: "通知"
      },
      {
        id: "000000006",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
        title: "曲丽丽 评论了你",
        description: "描述信息描述信息描述信息",
        datetime: "2017-08-07",
        type: "消息"
      },
      {
        id: "000000007",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
        title: "朱偏右 回复了你",
        description: "这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像",
        datetime: "2017-08-07",
        type: "消息"
      },
      {
        id: "000000008",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
        title: "标题",
        description: "这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像",
        datetime: "2017-08-07",
        type: "消息"
      },
      {
        id: "000000009",
        title: "任务名称",
        description: "任务需要在 2017-01-12 20:00 前启动",
        extra: "未开始",
        status: "todo",
        type: "待办"
      },
      {
        id: "000000010",
        title: "第三方紧急代码变更",
        description:
          "冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务",
        extra: "马上到期",
        status: "urgent",
        type: "待办"
      },
      {
        id: "000000011",
        title: "信息安全考试",
        description: "指派竹尔于 2017-01-09 前完成更新并发布",
        extra: "已耗时 8 天",
        status: "doing",
        type: "待办"
      },
      {
        id: "000000012",
        title: "ABCD 版本发布",
        description:
          "冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务",
        extra: "进行中",
        status: "processing",
        type: "待办"
      }
    ];
  },
  async user(ctx) {
    ctx.body = {
      name: "Gatinul",
      avatar: "static/avatar.png",
      userid: "00000001",
      notifyCount: 12
    };
  },
  async getActivities(ctx) {
    ctx.body = [
      {
        id: "trend-1",
        updatedAt: new Date(),
        user: {
          name: "曲丽丽",
          avatar: avatars2[0]
        },
        group: {
          name: "高逼格设计天团",
          link: "http://github.com/"
        },
        project: {
          name: "六月迭代",
          link: "http://github.com/"
        },
        template: "在 @{group} 新建项目 @{project}"
      },
      {
        id: "trend-2",
        updatedAt: new Date(),
        user: {
          name: "付小小",
          avatar: avatars2[1]
        },
        group: {
          name: "高逼格设计天团",
          link: "http://github.com/"
        },
        project: {
          name: "六月迭代",
          link: "http://github.com/"
        },
        template: "在 @{group} 新建项目 @{project}"
      },
      {
        id: "trend-3",
        updatedAt: new Date(),
        user: {
          name: "林东东",
          avatar: avatars2[2]
        },
        group: {
          name: "中二少女团",
          link: "http://github.com/"
        },
        project: {
          name: "六月迭代",
          link: "http://github.com/"
        },
        template: "在 @{group} 新建项目 @{project}"
      },
      {
        id: "trend-4",
        updatedAt: new Date(),
        user: {
          name: "周星星",
          avatar: avatars2[4]
        },
        project: {
          name: "5 月日常迭代",
          link: "http://github.com/"
        },
        template: "将 @{project} 更新至已发布状态"
      },
      {
        id: "trend-5",
        updatedAt: new Date(),
        user: {
          name: "朱偏右",
          avatar: avatars2[3]
        },
        project: {
          name: "工程效能",
          link: "http://github.com/"
        },
        comment: {
          name: "留言",
          link: "http://github.com/"
        },
        template: "在 @{project} 发布了 @{comment}"
      },
      {
        id: "trend-6",
        updatedAt: new Date(),
        user: {
          name: "乐哥",
          avatar: avatars2[5]
        },
        group: {
          name: "程序员日常",
          link: "http://github.com/"
        },
        project: {
          name: "品牌迭代",
          link: "http://github.com/"
        },
        template: "在 @{group} 新建项目 @{project}"
      }
    ];
  },
  async chart(ctx) {
    ctx.body = {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
      radarData
    };
  }
};
