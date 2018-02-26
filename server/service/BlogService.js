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
  }
};
