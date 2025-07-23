import { useEffect, useState } from "react";
import { BASE_URL, IMAGE_URL } from '../baseurl';


export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [editingSlug, setEditingSlug] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", image: null });
  const [message, setMessage] = useState("");

  // Fetch blogs from server
  const fetchBlogs = async () => {
    const res = await fetch(`${BASE_URL}`);
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Handle delete (by slug)
  const handleDelete = async (slug) => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;

    const res = await fetch(`${BASE_URL}/${slug}`, {
      method: "DELETE",
    });

    const data = await res.json();
    setMessage("🗑️ " + data.message);
    fetchBlogs();
  };

  // Handle edit
  const handleEdit = (blog) => {
    setEditingSlug(blog.slug);
    setForm({
      title: blog.title,
      content: blog.content,
      image: blog.image, // filename
    });
    setMessage("");
  };

  // Handle submit (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingSlug
      ? `${BASE_URL}/${editingSlug}`
      : `${BASE_URL}/upload`;

    const method = editingSlug ? "PUT" : "POST";

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);

    if (form.image && typeof form.image === "object") {
      formData.append("image", form.image);
    }

    const res = await fetch(url, {
      method,
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage("❌ " + (data.error || "Something went wrong"));
      return;
    }

    setMessage(editingSlug ? "✏️ Blog updated!" : "✅ Blog added!");
    setForm({ title: "", content: "", image: null });
    setEditingSlug(null);
    fetchBlogs();
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-3xl text-center font-bold text-[#145A32] mb-10">
        Blog Management
      </h1>

      {message && (
        <div className="text-center text-lg font-semibold text-[#145A32] mb-4">
          {message}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFF8E1] max-w-3xl mx-auto p-6 rounded-2xl shadow-xl mb-10"
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-bold mb-4">
          {editingSlug ? "Edit Blog" : "Add New Blog"}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-xl"
        />

        <textarea
          name="content"
          placeholder="Content"
          rows={5}
          value={form.content}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-xl"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-xl"
        />

        {form.image && typeof form.image === "object" && (
          <img
            src={URL.createObjectURL(form.image)}
            alt="Preview"
            className="w-full h-48 object-cover mb-4 rounded-xl"
          />
        )}

        <button
          type="submit"
          className="bg-[#145A32] text-white px-6 py-2 rounded-xl hover:bg-[#FF9800] transition-all duration-300"
        >
          {editingSlug ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      {/* Blog List */}
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border rounded-xl p-6 shadow-md bg-[#fefce8]"
          >
            <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              📅 {new Date(blog.date).toLocaleString()}
            </p>
            <p className="mb-3">{blog.content}</p>

            {blog.image && (
              <img
                src={`${IMAGE_URL}/${blog.image}`}
                alt="Blog"
                className="mb-3 rounded-xl w-full h-48 object-cover"
              />
            )}

            <div className="flex gap-4">
              <button
                onClick={() => handleEdit(blog)}
                className="bg-[#145A32] text-white px-4 py-1 rounded-xl hover:bg-[#FF9800] transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.slug)}
                className="bg-red-600 text-white px-4 py-1 rounded-xl hover:bg-red-800 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
