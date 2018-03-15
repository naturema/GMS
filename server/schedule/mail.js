const schedule = require("node-schedule");
const moment = require("moment");
const apiService = require("../service/ApiService");
const nodemailer = require("nodemailer");
const email = require("../../dbconfig").email;

const mailTransport = nodemailer.createTransport({
  host: "smtp.163.com",
  secure: true,
  post: "465",
  tls: {
    // resolve 'unable to verify the first certificate'
    rejectUnauthorized: false
  },
  auth: {
    user: email.name,
    pass: email.password
  }
});

module.exports = {
  async sendMail() {
    var rule3 = new schedule.RecurrenceRule();
    var times3 = [8, 10, 12, 14, 16, 18, 20, 22];
    rule3.hour = times3;
    schedule.scheduleJob(rule3, async function() {
      // console.log("[GMS Schedule] : " + moment().format());
      // const result = await blogService.getBlogTotal();
      const result = await apiService.getWarnSchedule();
      if (result.task.length > 0 || result.reminder.length > 0) {
        let taskHtml = "",
          reminderHtml = "";
        if (result.task.length > 0) {
          taskHtml +=
            "<hr/><h3>有" +
            result.task.length +
            "项待办任务将在5h内到时或已延滞，请快速处理~</h3><ul>";
          for (let item of result.task) {
            taskHtml +=
              "<li>" +
              item.task_title +
              "<ul><li><strong>到期时间：</strong>" +
              moment(item.hope_finish).format("YYYY-MM-DD HH:mm:ss") +
              "</li><li><strong>任务类型：</strong>" +
              item.task_type +
              "</li><li><strong>任务描述：</strong>" +
              item.task_desc +
              "</li></ul></li>";
          }
          taskHtml += "</ul>";
        }
        if (result.reminder.length > 0) {
          reminderHtml +=
            "<hr/><h3>有" +
            result.reminder.length +
            "项提醒事项将在5h内开始，请注意时间~</h3><ul>";
          for (let item of result.reminder) {
            reminderHtml +=
              "<li>" +
              item.content +
              "<ul><li><strong>开始时间：</strong>" +
              moment(item.date).format("YYYY-MM-DD HH:mm:ss") +
              "</li><li><strong>事项等级：</strong>" +
              item.level +
              "</li></ul></li>";
          }
          reminderHtml += "</ul>";
        }
        const options = {
          from: '"gatinul" <13252716435@163.com>',
          to: "shixy@asiainfo.com",
          subject: "[GMS] 待办提醒",
          text: "GMS提醒任务邮件",
          html:
            "<h1>Hi, Gatinul</h1>" +
            '<p><a href="http://gatinul.org:8080">GMS管理系统</a></p>' +
            taskHtml +
            reminderHtml
        };
        mailTransport.sendMail(options, function(err, msg) {
          if (err) {
            console.log(err);
          } else {
            console.log("[GMS Schedule] 发送邮件成功", msg);
          }
        });
      } else {
        console.log("[GMS Schedule] 暂无到时提醒");
      }
    });
  }
};
