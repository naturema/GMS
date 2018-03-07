import moment from "moment";

// mock data
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
    name: "月度",
    clothes: 300,
    life: 320,
    foods: 800,
    activity: 300,
    other: 500
  },
  {
    name: "季度",
    clothes: 1000,
    life: 900,
    foods: 2100,
    activity: 1150,
    other: 1750
  },
  {
    name: "年度",
    clothes: 4200,
    life: 4100,
    foods: 8000,
    activity: 4400,
    other: 7200
  }
];

//
const radarData = [];
const radarTitleMap = {
  clothes: "服饰",
  life: "日常",
  foods: "美食",
  activity: "娱乐",
  other: "其它"
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

export const getFakeChartData = {
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

export default {
  getFakeChartData
};
