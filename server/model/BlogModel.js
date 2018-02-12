const db = require("../db");
const time = require("silly-datetime");

module.exports = {
  async publish(title, short, content) {
    const option = {
      blog_title: title,
      blog_desc: short,
      blog_content: content,
      create_time: time.format(new Date()),
      status: 1 //1 发布 0 草稿
    };
    const result = await db.insertData("blog_main", option);
    return result;
  },
  async draft(title, short, content) {
    const option = {
      blog_title: title,
      blog_desc: short,
      blog_content: content,
      create_time: time.format(new Date()),
      status: 0 //1 发布 0 草稿
    };
    const result = await db.insertData("blog_main", option);
    return result;
  },
  async getDraft(row, size) {
    const _sql = `
         SELECT * FROM blog_main
         WHERE status=0 limit ${row},${size}`;
    const result = await db.query(_sql);
    return result;
  },
  async delDraft(id) {
    const result = await db.deleteDataById("blog_main", id);
    return result;
  }
};
