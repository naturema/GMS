const Router = require("koa-router");
const main = require("./controller/MainController");
const blog = require("./controller/BlogController");
const mock = require("./controller/MockController");

const router = new Router();

router.get("/", main.index);
router.post("/blog/publish", blog.publish);
router.post("/blog/draft", blog.draft);
router.post("/blog/getDraft", blog.getDraft);
router.post("/blog/delDraft", blog.delDraft);

router.get("/api/project/notice", mock.notice);
router.get("/api/currentUser", mock.user);
router.get("/api/activities", mock.getActivities);
router.get("/api/fake_chart_data", mock.chart);

module.exports = router;
