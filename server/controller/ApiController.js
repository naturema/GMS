const log = require("../config").common;
const logger = require("../config").error;
const format = require("../utils").format;
const sFormat = require("../utils").symbolFormat;
const apiService = require("../service/ApiService");

module.exports = {
  async login(ctx) {
    const data = JSON.parse(ctx.request.body);
    const { userName, password, type } = data;
    const result = {
      status: "error",
      type,
      currentAuthority: "guess"
    };
    const res = await apiService.canLogin(userName, password);
    if (res) {
      (result.status = "ok"), (result.currentAuthority = userName);
    }
    ctx.body = result;
  },
  async getAuthority(ctx) {
    const menu = ctx.request.body.path;
    const result = await apiService.getAuthority(menu);
    ctx.body = result;
  },
  async user(ctx) {
    const name = ctx.request.body;
    const result = await apiService.getUserInfo(name);
    ctx.body = {
      name,
      avatar: result.avatar_img,
      userid: result.id,
      notifyCount: parseInt(Math.random() * 16, 10)
    };
  }
};
