const log = require('../config').common;
const logger = require('../config').error;


module.exports = {
  /**
   * 渲染首页
   * @param {obj}
   */
  async index(ctx) {
    log.info('首屏加载...');
    await ctx.render('index');
  },
};
