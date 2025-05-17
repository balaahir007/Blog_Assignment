import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import debounce from "lodash.debounce";
import axiosInstance from "../utils/axiosInstance";
import { validateBlog } from "../validation/validateBlog";
import getOrCreateUserId from "../utils/getOrCreateUserId";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BlogPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const draft = location.state?.draft || {}; // Get draft if navigating from draft

  // Get or create unique user ID once per component lifecycle
  const userId = useMemo(() => getOrCreateUserId(), []);

  // Form data state, initialized from draft or empty values
  const [formData, setFormData] = useState({
    user: draft.user || null,
    id: draft.id || draft._id || null,
    title: draft.title || "",
    content: draft.content || "",
    tags: draft.tags || "",
    status: draft.status || "draft",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const typingRef = useRef(false);
  const hasSavedOnce = useRef(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (["title", "content", "tags"].includes(name)) {
      typingRef.current = true;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // isManual = true if user clicked save/publish buttons, false if auto-save
  const saveDraftOrUpdate = useCallback(async (data, isManual = false) => {
    try {
      if (!data.title.trim() && !data.content.trim()) return;

      setLoading(true);
      setError("");
      validateBlog(data); // Validate form data, throws if invalid


      const response = await axiosInstance.post("/blog/save-draft", {
        ...data,
        user: userId,
      });

      // Update form data with returned blog ID if saved first time
      if (response.data?._id) {
        setFormData((prev) => ({
          ...prev,
          id: response.data._id,
        }));
      }

      hasSavedOnce.current = true;
      if (isManual) navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [userId, navigate]);

  const debouncedSave = useCallback(
    debounce((data) => saveDraftOrUpdate(data), 5000),
    [saveDraftOrUpdate]
  );

  useEffect(() => {
    if (!typingRef.current) return;

    const { title, content, tags } = formData;
    if (title.trim() || content.trim() || tags.trim()) {
      debouncedSave({ ...formData, user: userId });
      typingRef.current = false;
    }
  }, [formData, userId, debouncedSave]);

  useEffect(() => {
    return () => debouncedSave.cancel();
  }, [debouncedSave]);

  // Handler for manual save as draft or publish
  const handleSave = async (status) => {
    if (!formData.title.trim() && !formData.content.trim()) {
      setError("Title and content and tags are required"); 
      return;
    }
    // Update status and user in form data before saving
    const updated = { ...formData, status, user: userId };
    setFormData(updated);
    await saveDraftOrUpdate(updated, true);
    if (status === "published") {
      toast.success("Blog published successfully!");
    } else {
      toast.success("Blog saved as draft successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-8 px-2 md:px-4">
      <div className="max-w-2xl mx-auto bg-white p-4 md:p-6 rounded-xl shadow-lg border relative">
        <h1 className="text-lg md:text-2xl font-bold text-gray-800 mb-6 text-center">
          ✍️ Create / Edit Blog
        </h1>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            autoComplete="off"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            placeholder="Enter blog title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            required
            onChange={handleChange}
            className="w-full h-40 px-3 py-2 border rounded-md resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            placeholder="Write your blog content here..."
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Tags</label>
          <input
            name="tags"
            type="text"
            value={formData.tags}
            required
            onChange={handleChange}
            autoComplete="off"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            placeholder="e.g., tech, react, lifestyle"
          />
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => handleSave("draft")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-md shadow"
          >
            💾 Save as Draft
          </button>
          <button
            onClick={() => handleSave("published")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-md shadow"
          >
            🚀 Publish
          </button>
        </div>
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-md shadow"
          >
            🏠 Go Home
          </button>
        </div>


        <div className="mt-4 text-center text-xs text-gray-500 italic">
          {loading
            ? "⏳ Saving..."
            : hasSavedOnce.current && !error
              ? "✔️ Auto-saved"
              : ""}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
