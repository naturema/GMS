const db = require("../db");
const time = require("silly-datetime");

module.exports = {
  async canLogin(userName, password) {
    const _sql = `select * from gms_user_login
    where user_name = "${userName}" and password = "${password}"
    `;
    const result = await db.query(_sql);
    return result;
  },
  async getAuthority(menu) {
    const _sql = `select user_name from gms_user_authority
    where menu = "${menu}"
    `;
    const result = await db.query(_sql);
    return result;
  },
  async getUserInfo(name) {
    const _sql = `select * from gms_user_login
    where user_name = "${name}"`;
    const result = await db.query(_sql);
    return result[0];
  }
};
