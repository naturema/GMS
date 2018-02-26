const db = require("../db");
const time = require("silly-datetime");

module.exports = {
  async publish(title, short, content, tags) {
    const obj = {};
    if (tags.length > 1) {
      obj.namea = tags[0];
      obj.nameb = tags[1];
      const colora = await this.getTagColor(tags[0]);
      const colorb = await this.getTagColor(tags[1]);
      obj.colora = colora;
      obj.colorb = colorb;
    } else {
      obj.namea = tags[0];
      obj.nameb = "";
      const colora = await this.getTagColor(tags[0]);
      obj.colora = colora;
      obj.colorb = "";
    }
    const option = {
      blog_title: title,
      blog_desc: short,
      blog_content: content,
      create_time: time.format(new Date()),
      status: 1, //1 发布 0 草稿
      tag_name_a: obj.namea,
      tag_name_b: obj.nameb,
      tag_color_a: obj.colora,
      tag_color_b: obj.colorb
    };
    const result = await db.insertData("blog_main", option);
    if (result.affectedRows > 0) {
      const commit = {
        commit_name: title,
        commit_desc: short,
        commit_time: time.format(new Date(), "YYYY/MM/DD")
      };
      db.insertData("blog_commit", commit);
    }
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
  },
  async getTags() {
    const result = await db.select("blog_tag", "*");
    return result;
  },
  async getTagColor(tag) {
    const _sql = `
      SELECT tag_color FROM blog_tag
      WHERE tag_name = "${tag}"
    `;
    const result = await db.query(_sql);
    return result[0].tag_color;
  }
};
