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
  },
  async getAllTask(ctx) {
    const data = JSON.parse(ctx.request.body);
    let obj = {};
    if (data.timeSlot === "week") {
      obj = sureWeek(new Date());
    } else if (data.timeSlot === "month") {
      obj = sureMonth(new Date());
    } else if (data.timeSlot === "year") {
      const y = new Date().getFullYear();
      obj = {
        start: y + "-01-01",
        end: y + "-12-31"
      };
    } else {
      obj = null;
    }
    const index = parseInt(data.page);
    const type = data.type ? data.type : "";
    const timeSlot = data.timeSlot ? data.timeSlot : "";
    const status = data.status ? data.status : "";
    const result = await taskService.getAllTask(index, 5, obj, status, type);
    ctx.body = result;
  },
  async getCount(ctx) {
    let result = {
      weekTodo: "- ",
      weekAll: "- ",
      expire: "- "
    };
    const obj = sureWeek(new Date());
    result.weekTodo = await taskService.getWeekTask(obj.start, obj.end, "0");
    result.weekAll = await taskService.getWeekTask(obj.start, obj.end);
    result.expire = await taskService.getExpire();
    ctx.body = result;
  },
  async getTotalTask(ctx) {
    let data = {};
    if (ctx.request.body.length) {
      data = JSON.parse(ctx.request.body);
    }
    const status = data.status ? data.status : "";
    const type = data.type ? data.type : "";
    const result = await taskService.getTotalTask(type, status);
    ctx.body = result;
  },
  async newTask(ctx) {
    const data = JSON.parse(ctx.request.body);
    data.status = "0";
    const result = await taskService.newTask(data);
    ctx.body = result;
  },
  async delTask(ctx) {
    const id = parseInt(ctx.request.body);
    const result = await taskService.delTask(id);
    ctx.body = result;
  },
  async changeTask(ctx) {
    const id = parseInt(ctx.request.body);
    const result = await taskService.changeTask(id);
    ctx.body = result;
  }
};
