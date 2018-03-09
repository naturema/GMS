const log = require("../config").common;
const logger = require("../config").error;
const format = require("../utils").format;
const sFormat = require("../utils").symbolFormat;
const taskModel = require("../model/TaskModel");
module.exports = {
  async getTodo(start, end, type) {
    const result = await taskModel.getWorkTodo(start, end, type);
    return result.length > 0 ? result : [];
  },
  async getAllTask(page, size, obj, status) {
    const result = await taskModel.getAllTask(page, size, obj, status);
    return result.length > 0 ? result : [];
  },
  async getWeekTask(start, end, status) {
    const result = await taskModel.getWeekTask(start, end, status);
    return result.length;
  },
  async getExpire() {
    const result = await taskModel.getExpire();
    return result.length;
  },
  async getTotalTask(type, status) {
    const result = await taskModel.getTotalTask(type, status);
    return result.length;
  }
};
