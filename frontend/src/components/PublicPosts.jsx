import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const PublicPosts = () => {
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        const response = await axiosInstance.get("/blog/published");
        if (response.status !== 200) {
          throw new Error("Failed to fetch published blogs");
        }
        const data = response.data;
        if (!data) {
          throw new Error("No data found");
        }
        setPublishedBlogs(data);
      } catch (error) {
        console.error("Error fetching published blogs:", error);
        setError("Could not load published blogs.");
      }
    };
    fetchPublishedBlogs();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        📝 Published Blogs
      </h2>
      {error && <div className="text-red-500">{error}</div>}
      {publishedBlogs.length === 0 && !error ? (
        <div className="text-gray-500">No published blogs yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {blog.content?.slice(0, 100)}...
              </p>
               <div className="text-sm text-indigo-700 font-medium">
                {blog.tags
                  ? blog.tags.split(",").map((tag, index, arr) => (
                      <span key={index} >
                        #{tag.trim()}
                        {index !== arr.length - 1 && ", "}
                      </span>
                    ))
                  : "No tags"}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PublicPosts;
