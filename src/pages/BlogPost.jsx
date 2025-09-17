import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { BASE_URL } from '../baseurl';
import axios from "axios";

export default function BlogPost() {
  const { slug } = useParams(); 
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/${slug}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setPost(data || null);
      })
      .catch((err) => {
        console.error("Failed to fetch blog post:", err);
      });
  }, [slug]);

  if (!post) return <div className="text-center p-10 text-red-500">Blog not found.</div>;

  return (
    <section className="px-4 md:px-24 py-16 bg-white">
      <Helmet>
        <title>{post.title} | SR Group Blogs</title>
        <meta name="description" content={post.summary || post.content.slice(0, 150)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary || post.content.slice(0, 150)} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.summary || post.content.slice(0, 150)} />
        <meta name="twitter:image" content={post.image} />
      </Helmet>
      <img
        src={post.image}
        alt={post.title}
        className="w-full max-h-[400px] object-cover rounded-lg shadow"
      />
      <div className="mt-8">
        <h1 className="text-3xl font-bold text-[#145A32]">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">📅 {new Date(post.date).toLocaleDateString()}</p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
      </div>
    </section>
  );
}
