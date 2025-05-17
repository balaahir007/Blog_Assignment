import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DraftPosts = () => {
  const [draftBlogs, setDraftBlogs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
    const location = useLocation();

  useEffect(() => {
    const fetchDraftBlogs = async () => {
      const user = localStorage.getItem("userId");
      try {
        const response = await axiosInstance.post("/blog/drafts", { userId: user });
        if (response.status !== 200) {
          throw new Error("Failed to fetch draft blogs");
        }
        const data = response.data;
        if (!data) {
          throw new Error("No data found");
        }
        setDraftBlogs(data);
      } catch (error) {
        console.error("Error fetching draft blogs:", error);
        setError("Could not load draft blogs.");
        setDraftBlogs([]);
      }
    };
    fetchDraftBlogs();
  }, [location]);

  const deleteDraftBlog  = async (id) => {
    try {
      const response = await axiosInstance.delete(`/blog/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to delete draft blog");
      }
      setDraftBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      toast.success("Draft blog deleted successfully!");
    } catch (error) {
      setError("Could not delete draft blog.");
    }
  }

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">🗂️ Drafts</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {draftBlogs.length === 0 && !error ? (
        <div className="text-gray-500">No drafts saved.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {draftBlogs.map((draft) => (
            <div
              key={draft._id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 flex flex-col"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{draft.title}</h3>

              <p className="text-gray-600 text-sm mb-3">
                {draft.content?.slice(0, 100) || "No content"}...
              </p>
              <div className="text-sm text-indigo-700 font-medium mb-4">
                {draft.tags
                  ? draft.tags.split(",").map((tag, index, arr) => (
                    <span key={index}>
                      #{tag.trim()}
                      {index !== arr.length - 1 && ", "}
                    </span>
                  ))
                  : "No tags"}
              </div>

              <div className="text-xs text-gray-400 mb-4">
                Last edited: {new Date(draft.updatedAt).toLocaleString()}
              </div>
              <div className="flex justify-end items-center gap-3 mt-auto">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition whitespace-nowrap cursor-pointer" onClick={() => navigate("/create-blog", { state: { draft } })}>
                  <FiEdit /> Edit
                </button>
                <button className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition whitespace-nowrap" onClick={() => deleteDraftBlog(draft._id)}>
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}

        </div>
      )}
    </>
  );
};

export default DraftPosts;
