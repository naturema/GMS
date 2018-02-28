const Router = require("koa-router");
const main = require("./controller/MainController");
const blog = require("./controller/BlogController");
const mock = require("./controller/MockController");

const router = new Router();

router.get("/", main.index);
router.post("/blog/publish", blog.publish);
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

router.get("/api/project/notice", mock.notice);
router.get("/api/currentUser", mock.user);
router.get("/api/activities", mock.getActivities);
router.get("/api/fake_chart_data", mock.chart);

module.exports = router;
