const log = require("../config").common;
const logger = require("../config").error;
const format = require("../utils").format;
const sFormat = require("../utils").symbolFormat;
const taskModel = require("../model/TaskModel");
module.exports = {
  async getTodo(start, end, type) {
    const result = await taskModel.getTodo(start, end, type);
    return result.length > 0 ? result : [];
  },
  async getAllTask(page, size, obj, status, type) {
    const result = await taskModel.getAllTask(page, size, obj, status, type);
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
  },
  async newTask(data) {
    const result = await taskModel.newTask(data);
    return result.affectedRows > 0 ? true : false;
  },
  async delTask(id) {
    const result = await taskModel.delTask(id);
    return result.affectedRows > 0 ? true : false;
  },
  async changeTask(id) {
    const result = await taskModel.changeTask(id);
    return result.affectedRows > 0 ? true : false;
  }
};
