const asyncHandler = require("express-async-handler");
const BlogModel = require("../models/Blog.model");

exports.getBlogs = asyncHandler(async (req, res) => {
  const blogs = (await BlogModel.find().sort({ createdAt: -1 }).lean()) ?? [];

  res.status(200).json({
    data: blogs,
  });
});

exports.getBlog = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params?.id).lean();

  if (!blog) {
    throw new Error("Blog not found");
  }

  res.status(200).json({
    data: blog,
  });
});

exports.createBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const blog = await BlogModel.create({
    title,
    overview: req.body?.overview ?? "",
    content,
    image: req.body?.image ?? "",
    author: req.user._id,
  });

  if (!blog) {
    throw new Error("Blog not created");
  }

  res.status(201).json({
    message: "Blog created successfully",
    data: blog,
  });
});

exports.updateBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const blog = await BlogModel.findOneAndUpdate(
    { id: req.params?.id, author: req.user._id },
    {
      title,
      overview: req.body?.overview ?? "",
      content,
      image: req.body?.image ?? "",
    },
    {
      new: true,
    }
  );

  if (!blog) {
    throw new Error("Blog not updated");
  }

  res.status(200).json({
    message: "Blog updated successfully",
    data: blog,
  });
});

exports.deleteBlog = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findOneAndDelete({
    id: req.params?.id,
    author: req.user._id,
  });

  if (!blog) {
    throw new Error("Blog not deleted");
  }

  res.status(200).json({
    message: "Blog deleted successfully",
    data: blog?.id,
  });
});
