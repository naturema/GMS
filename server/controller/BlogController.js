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
    const result = obj;
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
    const result = obj;
    log.info(format("保存博客", __filename));
    const opt = resolve(ctx);
    const res = await blogService.draft(opt.title, opt.short, opt.content);
    if (res) {
      result.success = true;
    } else {
      result.message = "保存失败";
    }
    ctx.body = result;
  },
  async getDraft(ctx) {
    const result = obj;
    const index = parseInt(ctx.request.body);
    log.info(format(`获取草稿博文${index + 1}到${index + 6}条`, __filename));
    const res = await blogService.getDraft(index, 6);
    if (res) {
      result.success = true;
      result.message = res;
    } else {
      result.message = "获取草稿失败";
    }
    ctx.body = result;
  },
  async delDraft(ctx) {
    const result = obj;
    console.log(ctx.request.body);
    const id = ctx.request.body;
    log.info(format(`删除id为${id}的博文草稿`, __filename));
    const res = await blogService.delDraft(id);
    if (res) {
      result.success = true;
      result.message = id;
    } else {
      result.message = "删除草稿失败";
    }
    ctx.body = result;
  }
};
/**
 * [resolve 处理博客数据]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
function resolve(ctx) {
  const arr = ctx.request.body.split("\n", 2);
  const title = arr[0];
  const content = ctx.request.body.split(title + "\n")[1];
  const short = content.split("<!--More-->\n")[0];
  let content1;
  content.split("<!--More-->\n")[1]
    ? (content1 = content.split("<!--More-->\n")[1])
    : (content1 = "");
  return {
    title: title.replace(/#/g, "").trim(),
    short: short.trim(),
    content: content.split("<!--More-->\n")[0] + content1
  };
}
const obj = {
  success: false,
  message: ""
};
