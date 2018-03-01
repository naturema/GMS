// 生产环境使用pm2

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
    const data = JSON.parse(ctx.request.body);
    const opt = resolve(data.value);
    const res = await blogService.publish(
      opt.title,
      opt.short,
      opt.content,
      data.tags
    );
    if (res) {
      result.success = true;
    } else {
      logger.error("发布失败");
      result.message = "发布失败";
    }
    ctx.body = result;
  },
  async editBlog(ctx) {
    const result = obj;
    log.info(format("发布博客", __filename));
    const data = JSON.parse(ctx.request.body);
    const opt = resolve(data.value);
    const res = await blogService.editBlog(
      opt.title,
      opt.short,
      opt.content,
      data.tags,
      data.id
    );
    if (res) {
      result.success = true;
    } else {
      logger.error("发布失败");
      result.message = "发布失败";
    }
    ctx.body = result;
  },
  async draft(ctx) {
    const result = obj;
    log.info(format("保存博客", __filename));
    const opt = resolve(ctx.request.body);
    const res = await blogService.draft(opt.title, opt.short, opt.content);
    if (res) {
      result.success = true;
    } else {
      logger.error("保存失败");
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
      logger.error("获取草稿失败");
      result.message = "获取草稿失败";
    }
    ctx.body = result;
  },
  async getBlog(ctx) {
    const result = obj;
    const index = parseInt(ctx.request.body);
    log.info(format(`获取博文第${index}页`, __filename));
    const res = await blogService.getBlog(index, 5);
    if (res) {
      result.success = true;
      result.message = res;
    } else {
      logger.error("获取博文失败");
      result.message = "获取博文失败";
    }
    ctx.body = result;
  },
  async delDraft(ctx) {
    const result = obj;
    const id = ctx.request.body;
    log.info(format(`删除id为${id}的博文草稿`, __filename));
    const res = await blogService.delDraft(id);
    if (res) {
      result.success = true;
      result.message = id;
    } else {
      logger.error("删除草稿失败");
      result.message = "删除草稿失败";
    }
    ctx.body = result;
  },
  async getTags(ctx) {
    const result = obj;
    log.info(format("获取博文标签列表", __filename));
    const res = await blogService.getTags();
    if (res) {
      result.success = true;
      result.message = res;
    } else {
      logger.error("获取博文标签列表失败");
      result.message = "获取博文标签列表失败";
    }
    ctx.body = result;
  },
  async getBlogTotal(ctx) {
    const result = obj;
    const res = await blogService.getBlogTotal();
    if (res) {
      result.success = true;
      result.message = res;
    } else {
      logger.error("获取博文总数失败");
      result.message = "获取博文总数失败";
    }
    ctx.body = result;
  },
  async getTagColor(ctx) {
    const result = obj;
    const res = await blogService.getTagColor();
    if (res) {
      result.success = true;
      result.message = res;
    } else {
      logger.error("获取可选标签颜色失败");
      result.message = "获取可选标签颜色失败";
    }
    ctx.body = result;
  },
  async editTag(ctx) {
    const result = obj;
    const data = JSON.parse(ctx.request.body);
    const res = await blogService.editTag(data);
    if (res) {
      result.success = true;
      result.message = res;
    } else {
      logger.error("编辑标签失败");
      result.message = "编辑标签失败";
    }
    ctx.body = result;
  },
  async newTag(ctx) {
    const result = obj;
    const data = JSON.parse(ctx.request.body);
    const res = await blogService.newTag(data);
    if (res) {
      result.success = true;
      result.message = res;
    } else {
      logger.error("新增标签失败");
      result.message = "新增标签失败";
    }
    ctx.body = result;
  },
  async delTag(ctx) {
    const result = obj;
    const data = JSON.parse(ctx.request.body);
    log.info(format(`删除id为${data.id}的标签`, __filename));
    const res = await blogService.delTag(data);
    if (res) {
      result.success = true;
    } else {
      logger.error("删除标签失败");
      result.message = "删除标签失败";
    }
    ctx.body = result;
  },
  async delBlog(ctx) {
    const result = obj;
    const id = ctx.request.body;
    log.info(format(`删除id为${id}的博文`, __filename));
    const res = await blogService.delBlog(id);
    if (res) {
      result.success = true;
    } else {
      logger.error("删除博文失败");
      result.message = "删除博文失败";
    }
    ctx.body = result;
  }
};
/**
 * [resolve 处理博客数据]
 * @param  {[type]} value [description]
 * @return {[type]}     [description]
 */
function resolve(value) {
  const arr = value.split("\n", 2);
  const title = arr[0];
  const content = value.split(title + "\n")[1];
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
