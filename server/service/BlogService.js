const log = require("../config").common;
const logger = require("../config").error;
const format = require("../utils").format;
const sFormat = require("../utils").symbolFormat;
const blogModel = require("../model/BlogModel");

module.exports = {
  async publish(title, short, content, tags) {
    const result = await blogModel.publish(title, short, content, tags);
    return result.affectedRows > 0 ? true : false;
  },
  async draft(title, short, content) {
    const result = await blogModel.draft(title, short, content);
    return result.affectedRows > 0 ? true : false;
  },
  async getDraft(row, size) {
    const result = await blogModel.getDraft(row, size);
    return result;
  },
  async delDraft(id) {
    const result = await blogModel.delDraft(id);
    return result.affectedRows > 0 ? true : false;
  },
  async getTags() {
    const result = await blogModel.getTags();
    return result;
  },
  async getBlog(page, size) {
    const result = await blogModel.getBlog(page, size);
    return result;
  },
  async getBlogTotal() {
    const result = await blogModel.getBlogTotal();
    return result[0].total_count;
  },
  async getTagColor() {
    const result = await blogModel.getTagColor();
    return result;
  },
  async editTag(data) {
    const result = await blogModel.updateTag(data);
    const result1 = await blogModel.updateTagColor(data.color, "0");
    const result2 = await blogModel.updateTagColor(data.value.color, "1");
    return result.affectedRows > 0 &&
      result1.affectedRows > 0 &&
      result2.affectedRows > 0
      ? true
      : false;
  },
  async newTag(data) {
    const result = await blogModel.insertTag(data.value);
    const result1 = await blogModel.updateTagColor(data.value.color, "1");
    return result.affectedRows > 0 && result1.affectedRows > 0 ? true : false;
  },
  async delTag(data) {
    const result = await blogModel.delTag(data.id);
    const result1 = await blogModel.updateTagColor(data.color, "0");
    return result.affectedRows > 0 && result1.affectedRows > 0 ? true : false;
  }
};
