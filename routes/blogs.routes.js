const {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controllers");
const { authCheck } = require("../middleware/auth.middleware");

const router = require("express").Router();

router.route("/").get(getBlogs).post(authCheck, createBlog);

router
  .route("/:id")
  .get(getBlog)
  .patch(authCheck, updateBlog)
  .delete(authCheck, deleteBlog);

module.exports = router;
