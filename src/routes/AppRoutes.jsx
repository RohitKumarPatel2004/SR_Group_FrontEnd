import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Property from '../pages/Property';
import AboutUs from '../pages/AboutUs';
import Blog from '../pages/Blog';
import ContactUs from '../pages/ContactUs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Layout from '../components/Layout'; 
import BlogPost from '../pages/BlogPost';
import UploadBlog from '../pages/UploadBlog';
import AdminDashboard from '../pages/AdminDashboard'
import ManageBlogs from "../pages/ManageBlogs";
import ClientData from '../pages/ClientData';
import FaqManager from '../pages/FaqManager';
import PropertyManage from "../pages/ManageProperty";
import ManageClientReviews from "../pages/ManageClientReviews";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      
      <Layout> {/* ✅ Apply layout once here */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property" element={<Property />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/upload-blog" element={<UploadBlog />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/manage-blogs" element={<ManageBlogs />} />
          <Route path="/admin/clients" element={<ClientData />} />
          <Route path="/admin/manage-faqs" element={<FaqManager />} />
          <Route path="/admin/manage-properties" element={<PropertyManage />} />
          <Route path="/admin/manage-reviews" element={<ManageClientReviews />} />

        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}
