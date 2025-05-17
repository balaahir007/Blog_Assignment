import Blog from "../schema/blogSchema.js";


export const createOrUpdateBlog = async (data) => {
  try {
    const { id, title, content, tags, status, user } = data;

    if (!title || !content || !tags) {
      throw new Error("title, content, and tags are required");
    }

    let blog;

    if (id) {
      blog = await Blog.findByIdAndUpdate(
        id,
        { title, content, tags, status, user },
        { new: true }
      );
    } else {
      blog = new Blog({ title, content, tags, status, user });
      await blog.save();
    }

    return blog;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getPublishedPosts = async () => {
  try {
    const blogs = await Blog.find({ status: "published" });
    return blogs;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDraftPosts = async (userId) => {
  try {
    const blogs = await Blog.find({ user: userId, status: "draft" });
    console.log("draft blogs", blogs);
    return blogs;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteBlog = async (id) => {
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      throw new Error("Blog not found for deletion");
    }
    return blog;
  } catch (error) {
    throw new Error(error.message);
  }
};
