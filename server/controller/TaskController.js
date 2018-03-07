const log = require("../config").common;
const logger = require("../config").error;
const format = require("../utils").format;
const sFormat = require("../utils").symbolFormat;
const sureWeek = require("../utils").sureWeek;
const sureMonth = require("../utils").sureMonth;
const taskService = require("../service/TaskService");

module.exports = {
  async getWorkTodo(ctx) {
    const data = JSON.parse(ctx.request.body);
    let obj = {};
    if (data.timeSlot === "week") {
      obj = sureWeek(new Date());
    } else if (data.timeSlot === "month") {
      obj = sureMonth(new Date());
    } else {
      const y = new Date().getFullYear();
      obj = {
        start: y + "-01-01",
        end: y + "-12-31"
      };
    }
    const result = await taskService.getTodo(obj.start, obj.end, "work");
    ctx.body = result;
  },
  async getMyTodo(ctx) {
    const data = JSON.parse(ctx.request.body);
    let obj = {};
    if (data.timeSlot === "week") {
      obj = sureWeek(new Date());
    } else if (data.timeSlot === "month") {
      obj = sureMonth(new Date());
    } else {
      const y = new Date().getFullYear();
      obj = {
        start: y + "-01-01",
        end: y + "-12-31"
      };
    }
    const result = await taskService.getTodo(obj.start, obj.end, "my");
    ctx.body = result;
  }
};
