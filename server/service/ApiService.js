const log = require("../config").common;
const logger = require("../config").error;
const format = require("../utils").format;
const sFormat = require("../utils").symbolFormat;
const apiModel = require("../model/ApiModel");

module.exports = {
  async canLogin(userName, password) {
    const result = await apiModel.canLogin(userName, password);
    return result.length > 0 ? true : false;
  },
  async getAuthority(menu) {
    console.log(menu);
    const result = await apiModel.getAuthority(menu);
    return result ? result : [];
  }
};
