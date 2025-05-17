export const validateBlog = (data) => {
  if (!data.title || data.title.trim().length < 5) {
    throw new Error("Title must be at least 5 characters long");
  }

  if (!data.content || data.content.trim().length < 20) {
    throw new Error("Content must be at least 20 characters long");
  }

  if (!data.tags || data.tags.trim().length === 0) {
    throw new Error("At least one tag is required");
  }
};
