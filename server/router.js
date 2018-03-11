const Router = require("koa-router");
const main = require("./controller/MainController");
const blog = require("./controller/BlogController");
const mock = require("./controller/MockController");
const task = require("./controller/TaskController");
const api = require("./controller/ApiController");

const router = new Router();

router.get("/", main.index);
// 系统api
router.post("/api/getAuthority", api.getAuthority);
router.post("/api/login/account", api.login);
router.post("/api/currentUser", api.user);
// 博客管理
router.post("/blog/publish", blog.publish);
router.post("/blog/editBlog", blog.editBlog);
router.post("/blog/draft", blog.draft);
router.post("/blog/getDraft", blog.getDraft);
router.post("/blog/getBlog", blog.getBlog);
router.post("/blog/delDraft", blog.delDraft);
router.get("/blog/getTags", blog.getTags);
router.get("/blog/getBlogTotal", blog.getBlogTotal);
router.get("/blog/getTagColor", blog.getTagColor);
router.post("/blog/editTag", blog.editTag);
router.post("/blog/newTag", blog.newTag);
router.post("/blog/delTag", blog.delTag);
router.post("/blog/delBlog", blog.delBlog);
// 任务管理
router.post("/task/getWorkTodo", task.getWorkTodo);
router.post("/task/getMyTodo", task.getMyTodo);
router.post("/task/getAllTask", task.getAllTask);
router.get("/task/getCount", task.getCount);
router.post("/task/getTotalTask", task.getTotalTask);
router.post("/task/newTask", task.newTask);
router.post("/task/delTask", task.delTask);
router.post("/task/changeTask", task.changeTask);

// 提醒管理
router.get("/remainder/getRemainderWeek", mock.getRemainderWeek);

router.get("/api/project/notice", mock.notice);
router.get("/api/currentUser", mock.user);
router.get("/api/activities", mock.getActivities);
router.get("/api/fake_chart_data", mock.chart);

module.exports = router;
