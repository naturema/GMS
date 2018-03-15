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
  },
  async getWarnTask(time) {
    const _sql = `select * from gms_task
    where "${time}" > hope_finish and status = "0"`;
    return db.query(_sql);
  },
  async getWarnRemind(time) {
    const _sql = `select * from gms_reminder
    where "${time}" > date and status = "0"`;
    return db.query(_sql);
  },
  async getWarnCost(start, end) {
    const s = start + " 00:00:00";
    const e = end + " 23:59:59";
    const arr = [
      {
        real_cost: 1700,
        pre_cost: 2000
      }
    ];
    return arr;
  }
};
