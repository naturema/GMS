const log = require("../config").common;
const logger = require("../config").error;
const format = require("../utils").format;
const sFormat = require("../utils").symbolFormat;
const sendMail = require("../utils").sendMail;
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
    const md5Pwd = require('crypto').createHash('md5').update(password).digest('hex');
    const res = await apiService.canLogin(userName, md5Pwd);
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
  },
  async register(ctx) {
    const data = JSON.parse(ctx.request.body);
    const { name, password, confirm } = data;
    const md5Pwd = require('crypto').createHash('md5').update(password).digest('hex');
    console.log(md5Pwd);
    const opt = {
      user_name: name,
      password: md5Pwd,
      avatar_img: "static/user.png",
      status: "0"
    }
    const result = await apiService.register(opt);
    const obj = {}
    if(result) {
      obj.status = "ok",
      obj.currentAuthority = name
    }else {
      obj.status = "error",
      obj.currentAuthority = "guess"
    }
    ctx.body = obj;
  },
  async warnReview(ctx) {
    const data = JSON.parse(ctx.request.body);
    const { name } = data;
    const content = `用户 < ${name} > 的注册待审核，请尽快处理`
    const subject = "[GMS] 审核提醒"
    const text = "用户注册审核提醒"
    sendMail(subject, text, content)
    ctx.body = "ok";
  }
};
