import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import ProtectedRoute from '../components/ProtectedRoute';
const UpdateAdmin = lazy(() => import('../pages/UpdateAdmin'));

// Lazy loaded pages
const Home = lazy(() => import('../pages/Home'));
const Property = lazy(() => import('../pages/Property'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const Blog = lazy(() => import('../pages/Blog'));
const BlogPost = lazy(() => import('../pages/BlogPost'));
const ContactUs = lazy(() => import('../pages/ContactUs'));
const UploadBlog = lazy(() => import('../pages/UploadBlog'));
const AdminLogin = lazy(() => import('../pages/AdminLogin'));
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
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/property" element={<Property />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/upload-blog" element={<UploadBlog />} />

            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route path="/admin/update" element={<ProtectedRoute><UpdateAdmin /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/manage-blogs" element={<ProtectedRoute><ManageBlogs /></ProtectedRoute>} />
            <Route path="/admin/clients" element={<ProtectedRoute><ClientData /></ProtectedRoute>} />
            <Route path="/admin/manage-faqs" element={<ProtectedRoute><FaqManager /></ProtectedRoute>} />
            <Route path="/admin/manage-properties" element={<ProtectedRoute><PropertyManage /></ProtectedRoute>} />
            <Route path="/admin/manage-reviews" element={<ProtectedRoute><ManageClientReviews /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}
