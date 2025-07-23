import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../baseurl";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}`)
      .then((res) => {
        const latestBlogs = res.data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3); // limit to 3 posts
        setBlogs(latestBlogs);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="py-16 px-4 md:px-10 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#145A32]">
            Recent Blog Posts
          </h2>
          <p className="text-gray-600 mt-2">
            Explore our latest tips, news, and real estate insights
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => {
            const imageURL = blog.image?.startsWith("http")
              ? blog.image
              : `${IMAGE_URL}/${blog.image}`;

            return (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow hover:shadow-xl transition group overflow-hidden"
              >
                <div className="overflow-hidden h-52">
                  <img
                    src={imageURL}
                    alt={blog.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-sm text-[#145A32] font-medium">
                    {formatDate(blog.date)}
                  </p>
                  <h3 className="text-lg font-semibold text-[#145A32]">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {blog.content?.trim().split(" ").slice(0, 20).join(" ")}...
                  </p>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-block text-sm text-[#145A32] font-medium mt-3 hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/blogs"
            className="inline-block bg-[#145A32] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0f3e22] transition"
          >
            View All Blogs →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
