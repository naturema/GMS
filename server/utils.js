const moment = require("moment");
/**
 * 返回格式化后的日志
 * @param  {string} 日志内容
 * @param  {string} 当前文件路径
 */
exports.format = function(str, file) {
  const a = file.split("/");
  const b = a[a.length - 1].split(".");
  const name = firstUpperCase(b[0]);
  return `${name}：${str}`;
};
exports.symbolFormat = function(str) {
  const result = "****" + str + "****";
  return result;
};
/**
 * 首字母大写
 * @param  {string} str
 */
function firstUpperCase(str) {
  return str.replace(/^\S/, s => {
    return s.toUpperCase();
  });
}

exports.sureWeek = function(d) {
  const i = d.getDay(); // 获取是周几
  const date = moment(d).format("YYYY-MM-DD");
  const obj = {};
  if (i == 0) {
    obj.start = moment(date).subtract(6, "days");
    obj.end = date;
  } else {
    obj.start = moment(date)
      .subtract(i - 1, "days")
      .format("YYYY-MM-DD");
    obj.end = moment(date)
      .add(7 - i, "days")
      .format("YYYY-MM-DD");
  }
  return obj;
};
exports.sureMonth = function(d) {
  const obj = {};
  const y = d.getFullYear(),
    m = d.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);
  obj.start = moment(firstDay).format("YYYY-MM-DD");
  obj.end = moment(lastDay).format("YYYY-MM-DD");
  return obj;
};
