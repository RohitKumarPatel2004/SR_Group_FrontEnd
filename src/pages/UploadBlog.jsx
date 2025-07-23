// src/pages/UploadBlog.jsx
import { useState } from 'react';
import { BASE_URL, IMAGE_URL } from '../baseurl';

export default function UploadBlog() {
  const [form, setForm] = useState({ title: '', content: '', image: '' });
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setStatus('');

    try {
      const res = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setStatus('success');
      setMessage('✅ ' + data.message);
      setForm({ title: '', content: '', image: '' });
    } catch (err) {
      setStatus('error');
      setMessage('❌ ' + err.message);
    }
  };

  return (
    <div className="min-h-screen py-10 px-6 bg-white flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#145A32] mb-8">Upload New Blog</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#FFF8E1] p-8 rounded-2xl shadow-xl space-y-6 transition-all duration-300"
      >
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB74D]"
          required
        />
        <textarea
          name="content"
          placeholder="Blog Content"
          rows={6}
          value={form.content}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB74D]"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image Name (e.g., blog1.png)"
          value={form.image}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB74D]"
          required
        />

        <button
          type="submit"
          className="bg-[#145A32] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#FF9800] transition-colors duration-300"
        >
          Upload Blog
        </button>

        {message && (
          <div
            className={`mt-4 text-center font-semibold transition-all duration-300 ${
              status === 'success'
                ? 'text-green-600 animate-bounce'
                : 'text-red-600 animate-pulse'
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
