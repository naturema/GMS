const log = require("../config").common;
const logger = require("../config").error;
const format = require("../utils").format;
const sFormat = require("../utils").symbolFormat;
const apiModel = require("../model/ApiModel");
const moment = require("moment");
const sureMonth = require("../utils").sureMonth;

module.exports = {
  async canLogin(userName, password) {
    const result = await apiModel.canLogin(userName, password);
    return result.length > 0 ? true : false;
  },
  async getAuthority(menu) {
    const result = await apiModel.getAuthority(menu);
    return result ? result : [];
  },
  async getUserInfo(name) {
    const result = await apiModel.getUserInfo(name);
    return result;
  },
  async getWarnSchedule() {
    const obj = {};
    const time = moment()
      .add(5, "hours")
      .format("YYYY-MM-DD HH:mm:ss");
    obj.task = await apiModel.getWarnTask(time);
    obj.reminder = await apiModel.getWarnRemind(time);
    return obj;
  },
  async register(opt) {
    const result = await apiModel.register(opt)
    return result.affectedRows > 0 ? true : false;
  }
};
