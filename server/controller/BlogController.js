const log = require("../config").common;
const logger = require("../config").error;
const format = require("../utils").format;
const sFormat = require("../utils").symbolFormat;
const blogService = require("../service/BlogService");
module.exports = {
  /**
   * 渲染首页
   * @param {obj}
   */
  async publish(ctx) {
    const result = {
      success: false,
      message: ""
    };
    log.info(format("发布博客", __filename));
    const opt = resolve(ctx);
    const res = await blogService.publish(opt.title, opt.short, opt.content);
    if (res) {
      result.success = true;
    } else {
      result.message = "发布失败";
    }
    ctx.body = result;
  },
  async draft(ctx) {
    const result = {
      success: false,
      message: ""
    };
    log.info(format("保存博客", __filename));
    const opt = resolve(ctx);
    console.log(opt);
    const res = await blogService.draft(opt.title, opt.short, opt.content);
    if (res) {
      result.success = true;
    } else {
      result.message = "保存失败";
    }
    ctx.body = result;
  }
};
function resolve(ctx) {
  const arr = ctx.request.body.split("\n", 2);
  const title = arr[0];
  const content = ctx.request.body.split(title + "\n")[1];
  const short = content.split("<!--More-->\n")[0];
  return {
    title: title.replace(/#/g, "").trim(),
    short: short.trim(),
    content:
      content.split("<!--More-->\n")[0] + content.split("<!--More-->\n")[1]
  };
}
