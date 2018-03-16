const db = require("../db");
const time = require("silly-datetime");

module.exports = {
  async publish(title, short, content, tags) {
    let tagIda = "",
      tagIdb = "";
    if (tags.length > 1) {
      tagIda = await this.getTagIdByName(tags[0]);
      tagIdb = await this.getTagIdByName(tags[1]);
    } else {
      tagIda = await this.getTagIdByName(tags[0]);
    }
    const option = {
      blog_title: title,
      blog_desc: short,
      blog_content: content,
      update_time: time.format(new Date()),
      status: 1, //1 发布 0 草稿
      tag_id_a: tagIda,
      tag_id_b: tagIdb
    };
    const result = await db.insertData("blog_main", option);
    if (result.affectedRows > 0) {
      const commit = {
        commit_name: title,
        commit_desc: short,
        commit_time: time.format(new Date(), "YYYY/MM/DD"),
        commit_type: "新增"
      };
      db.insertData("blog_commit", commit);
    }
    return result;
  },
  async editBlog(title, short, content, tags, id) {
    let tagIda = "",
      tagIdb = "";
    if (tags.length > 1) {
      tagIda = await this.getTagIdByName(tags[0]);
      tagIdb = await this.getTagIdByName(tags[1]);
    } else {
      tagIda = await this.getTagIdByName(tags[0]);
    }
    const option = {
      blog_title: title,
      blog_desc: short,
      blog_content: content,
      update_time: time.format(new Date()),
      status: 1, //1 发布 0 草稿
      tag_id_a: tagIda,
      tag_id_b: tagIdb
    };
    const result = await db.updateData("blog_main", option, id);
    if (result.affectedRows > 0) {
      const commit = {
        commit_name: title,
        commit_desc: short,
        commit_time: time.format(new Date(), "YYYY/MM/DD"),
        commit_type: "修改"
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
      update_time: time.format(new Date()),
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
    const _sql = `SELECT * FROM blog_tag WHERE 1=1`;
    const result = await db.query(_sql);
    return result;
  },
  async getBlog(page, size) {
    const row = (page - 1) * 5;
    const _sql = `select a.*,group_concat(b.tag_name) as tag_name,group_concat(b.tag_color) as tag_color
      from blog_main a left OUTER JOIN blog_tag b
	    on ( a.tag_id_a = b.id or a.tag_id_b = b.id)
      where a.status = "1"
      group by a.id limit ${row},${size}`;
    const result = await db.query(_sql);
    return result;
  },
  async getTagColor(tag) {
    const _sql = `
      SELECT tag_color FROM blog_tag
      WHERE tag_name = "${tag}"
    `;
    const result = await db.query(_sql);
    return result[0].tag_color;
  },
  async getBlogTotal() {
    const _sql = `
      SELECT COUNT(*) AS total_count FROM blog_main
      WHERE status = 1
    `;
    return db.query(_sql);
  },
  async getWeekBlog(start, end) {
    const s = start + " 00:00:00";
    const e = end + " 23:59:59";
    const _sql = `
      SELECT COUNT(*) AS total_count FROM blog_main
      WHERE status = 1 and update_time between "${s}" and "${e}"
    `;
    return db.query(_sql);
  },
  async getDraftTotal() {
    const _sql = `
      SELECT COUNT(*) AS total_count FROM blog_main
      WHERE status = 0
    `;
    return db.query(_sql);
  },
  async getTagColorAll() {
    const _sql = `
      select * from blog_tag_color
      where status = 0
    `;
    return db.query(_sql);
  },
  async updateTagColor(color, status) {
    const _sql = `
      update blog_tag_color
      set status = "${status}"
      where color = "${color}"
    `;
    const result = await db.query(_sql);
    return result;
  },
  async updateTag(data) {
    const _sql = `
      update blog_tag
      set tag_name = "${data.value.name}",tag_color="${data.value.color}",
      tag_desc="${data.value.desc}",update_time="${time.format(new Date())}"
      where id = "${data.id}"
    `;
    const result = await db.query(_sql);
    return result;
  },
  async insertTag(value) {
    const option = {
      tag_name: value.name,
      tag_color: value.color,
      tag_desc: value.desc,
      update_time: time.format(new Date())
    };
    const result = await db.insertData("blog_tag", option);
    return result;
  },
  async delTag(id) {
    const result = await db.deleteDataById("blog_tag", id);
    return result;
  },
  async delBlog(id) {
    const result = await db.deleteDataById("blog_main", id);
    return result;
  },
  async getTagIdByName(name) {
    const _sql = `
      SELECT id FROM blog_tag
      WHERE tag_name = "${name}"
    `;
    const result = await db.query(_sql);
    return result[0].id;
  }
};
