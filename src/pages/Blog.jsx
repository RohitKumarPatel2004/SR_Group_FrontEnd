import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BASE_URL } from '../baseurl';
import axios from "axios";
import { Helmet } from "react-helmet-async";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get(`${BASE_URL}`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Failed to load blogs", err));
  }, []);

  if (blogs.length === 0) return null;

  const recentBlog = blogs[0];
  const previousBlogs = blogs.slice(1);

  return (
    <section className="w-full bg-white">
      {/* 🏡 Hero Section */}

   <Helmet>
  <title>{recentBlog.title} | SR Group Blogs</title>
  <meta 
    name="description" 
    content={recentBlog.summary || recentBlog.content.slice(0, 150)} 
  />
  <meta 
    name="keywords" 
    content={`SR Group Blog, ${recentBlog.title}, Real Estate Tips, Property Investment, ${recentBlog.slug}`} 
  />

  {/* Open Graph (FB, LinkedIn, WhatsApp) */}
  <meta property="og:title" content={`${recentBlog.title} | SR Group Blogs`} />
  <meta property="og:description" content={recentBlog.summary || recentBlog.content.slice(0, 150)} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={`https://thesrgroupofficial.in/blog/${recentBlog.slug}`} />
  <meta property="og:image" content={recentBlog.image || "https://thesrgroupofficial.in/SR_logo.png"} />
  <meta property="og:site_name" content="SR Group" />

  {/* Canonical URL */}
  <link rel="canonical" href={`https://thesrgroupofficial.in/blog/${recentBlog.slug}`} />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${recentBlog.title} | SR Group Blogs`} />
  <meta name="twitter:description" content={recentBlog.summary || recentBlog.content.slice(0, 150)} />
  <meta name="twitter:image" content={recentBlog.image || "https://thesrgroupofficial.in/SR_logo.png"} />
</Helmet>


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[70vh] overflow-hidden"
      >
        <img
          src={recentBlog.image}
          alt={recentBlog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center px-8 md:px-24">
          <div className="text-white max-w-2xl">
            <p className="text-sm mb-2">{new Date(recentBlog.date).toLocaleDateString()}</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-snug">{recentBlog.title}</h1>
            <p className="mt-4 text-base md:text-lg">
              {recentBlog.content?.split(" ").slice(0, 30).join(" ")}...
            </p>
            <Link
              to={`/blogs/${recentBlog.slug}`}
              className="inline-block mt-5 bg-white text-[#145A32] px-6 py-2 font-medium rounded hover:bg-[#DFF2E1] transition"
            >
              Read Full Post →
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="py-16 px-4 md:px-24 bg-[#f9f9f9]">
        <h2 className="text-2xl font-bold text-[#145A32] mb-6">Previous Blogs</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {previousBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-[#DFF2E1] rounded-xl shadow hover:shadow-xl transition overflow-hidden group"
            >
              <div className="overflow-hidden h-52">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5 space-y-2">
                <p className="text-sm text-[#145A32] font-medium">{new Date(blog.date).toLocaleDateString()}</p>
                <h3 className="text-lg font-semibold text-[#145A32]">{blog.title}</h3>
                <p className="text-sm text-gray-700">
                  {blog.content?.split(" ").slice(0, 20).join(" ")}...
                </p>
                <Link
                  to={`/blog/${blog.slug}`}
                  className="inline-block text-sm text-[#145A32] font-medium mt-3 hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
