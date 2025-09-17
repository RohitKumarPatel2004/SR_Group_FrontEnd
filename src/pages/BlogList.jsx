import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from '../baseurl';
import axios from "axios";
import { Helmet } from "react-helmet-async";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <section className="bg-[#f9f9f9] py-16 px-4 md:px-24">
       <Helmet>
        <title>All Blogs | SR Group</title>
        <meta name="description" content="Explore latest articles on property buying, renting, and investment tips from SR Group." />
        <meta property="og:title" content="SR Group Blogs" />
        <meta property="og:description" content="Explore real estate blogs about property buying, selling, renting & investment tips." />
        <meta property="og:image" content="/SR_logo.png" />
      </Helmet>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-[#145A32]">All Blog Posts</h2>
        <p className="text-gray-600 mt-2">Explore our latest articles on property buying, renting & investments</p>
        <div className="w-24 h-1 bg-[#145A32] mx-auto mt-3 rounded"></div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow hover:shadow-xl transition group overflow-hidden"
          >
            <div className="overflow-hidden h-52">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-5 space-y-2">
              <p className="text-sm text-[#145A32] font-medium">{new Date(blog.date).toLocaleDateString()}</p>
              <h3 className="text-lg font-semibold text-[#145A32]">{blog.title}</h3>
              <p className="text-sm text-gray-700">{blog.summary || blog.content.slice(0, 80)}...</p>

              <Link
                to={`/blog/${blog.slug}`}
                className="inline-block text-sm text-[#145A32] font-medium mt-3 hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
