import {  createOrUpdateBlog, deleteBlog, getDraftPosts, getPublishedPosts } from "../models/blogModels.js";

export const createOrUpdateBlogController = async (req,res) => {
  try {
    const blogData = req.body;
    console.log(blogData);
    const newBlog = await createOrUpdateBlog(blogData);
    return res.status(201).json(newBlog);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getPublishedPostsController = async (req,res) => {
  try {
    const blogs = await getPublishedPosts();
    return res.status(200).json(blogs);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getDraftPostsController = async (req,res) => {
  try {
    const { userId } = req.body;
    console.log("draft controller");
    const blogs = await getDraftPosts(userId);
    return res.status(200).json(blogs);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteBlogController = async (req,res) => {
  try {
    const { id } = req.params;
    const blog = await deleteBlog(id);
    return res.status(200).json(blog);
  } catch (error) {
    throw new Error(error.message);
  }
};
