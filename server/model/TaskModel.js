const db = require("../db");
const time = require("silly-datetime");

module.exports = {
  async getWorkTodo(start, end, type) {
    const _sql = `select * from gms_task
    where task_type = "${type}" and date_format(create_date,'%Y/%m/%d')
    between date_format("${start}",'%Y/%m/%d')
    and date_format("${end}",'%Y/%m/%d') and status = "0"
    `;
    const result = await db.query(_sql);
    return result;
  }
};
