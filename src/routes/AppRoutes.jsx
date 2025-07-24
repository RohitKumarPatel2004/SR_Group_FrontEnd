import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

// Lazy loaded pages
const Home = lazy(() => import('../pages/Home'));
const Property = lazy(() => import('../pages/Property'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const Blog = lazy(() => import('../pages/Blog'));
const BlogPost = lazy(() => import('../pages/BlogPost'));
const ContactUs = lazy(() => import('../pages/ContactUs'));
const UploadBlog = lazy(() => import('../pages/UploadBlog'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
const ManageBlogs = lazy(() => import('../pages/ManageBlogs'));
const ClientData = lazy(() => import('../pages/ClientData'));
const FaqManager = lazy(() => import('../pages/FaqManager'));
const PropertyManage = lazy(() => import('../pages/ManageProperty'));
const ManageClientReviews = lazy(() => import('../pages/ManageClientReviews'));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <Suspense fallback={<Spinner />}>
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
        </Suspense>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}
