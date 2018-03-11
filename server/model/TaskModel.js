const db = require("../db");
const time = require("silly-datetime");

module.exports = {
  async getTodo(start, end, type) {
    const _sql = `select * from gms_task
    where task_type = "${type}" and status = "0" order by hope_finish
    `;
    const result = await db.query(_sql);
    return result;
  },
  async getAllTask(page, size, obj, status, type) {
    const datetime = time.format(new Date());
    const row = (page - 1) * 5;
    let _sql = `
         SELECT *,if(task_type='work','工作','个人' ) as type FROM gms_task
         where 1=1`;
    if (obj) {
      _sql += ` and date_format(start_date,'%Y/%m/%d')
      between date_format("${obj.start}",'%Y/%m/%d')
      and date_format("${obj.end}",'%Y/%m/%d')`;
    }
    if (status) {
      if (status == "0") {
        _sql += ` and date_format("${datetime}",'%d %b %Y %T:%f') <= date_format(hope_finish,'%d %b %Y %T:%f')
      and status = "0"`;
      } else if (status == "2") {
        _sql += ` and date_format("${datetime}",'%d %b %Y %T:%f') > date_format(hope_finish,'%d %b %Y %T:%f')
      and status = "0"`;
      } else {
        _sql += ` and status = "${status}"`;
      }
    }
    if (type) {
      _sql += ` and task_type = "${type}"`;
    }
    _sql += ` order by hope_finish limit ${row},${size} `;
    const result = await db.query(_sql);
    return result;
  },
  async getWeekTask(start, end, status) {
    const s = start + " 00:00:00";
    const e = end + " 23:59:59";
    const datetime = time.format(new Date());
    let _sql = `select * from gms_task
    where start_date between "${s}" and "${e}"
    `;
    if (status) {
      _sql += ` and status = "${status}" and
      date_format("${datetime}",'%d %b %Y %T:%f') <= date_format(hope_finish,'%d %b %Y %T:%f')`;
    }
    const result = await db.query(_sql);
    return result;
  },
  async getExpire() {
    const datetime = time.format(new Date());
    const _sql = `select * from gms_task where
    date_format("${datetime}",'%d %b %Y %T:%f') > date_format(hope_finish,'%d %b %Y %T:%f')
    and status = "0"`;
    const result = await db.query(_sql);
    return result;
  },
  async getTotalTask(type, status) {
    const datetime = time.format(new Date());
    let _sql = `select * from gms_task where 1=1`;
    if (type) {
      _sql += ` and task_type = "${type}"`;
    }
    if (status) {
      if (status == "0") {
        _sql += ` and date_format("${datetime}",'%d %b %Y %T:%f') <= date_format(hope_finish,'%d %b %Y %T:%f')
      and status = "0"`;
      } else if (status == "2") {
        _sql += ` and date_format("${datetime}",'%d %b %Y %T:%f') > date_format(hope_finish,'%d %b %Y %T:%f')
      and status = "0"`;
      } else {
        _sql += ` and status = "${status}"`;
      }
    }

    const result = await db.query(_sql);
    return result;
  },
  async newTask(option) {
    time.format(option.start_date);
    time.format(option.hope_finish);
    const result = await db.insertData("gms_task", option);
    return result;
  },
  async delTask(id) {
    const result = await db.deleteDataById("gms_task", id);
    return result;
  },
  async changeTask(id) {
    const _sql = `update gms_task set status = "1"
    where id = "${id}"`;
    const result = await db.query(_sql);
    return result;
  }
};
