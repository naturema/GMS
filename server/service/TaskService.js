const log = require("../config").common;
const logger = require("../config").error;
const format = require("../utils").format;
const sFormat = require("../utils").symbolFormat;
const taskModel = require("../model/TaskModel");
module.exports = {
  async getTodo(start, end, type) {
    const result = await taskModel.getWorkTodo(start, end, type);
    return result.length > 0 ? result : [];
  }
};
