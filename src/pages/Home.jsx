import { Helmet } from "react-helmet-async";
import AboutCompany from '../components/AboutCompany';
import PropertyList from '../components/PropertyList';
import ClientReviews from '../components/ClientReviews';
import FeatureSR from '../components/FeatureSR';
import ChooseUs from '../components/ChooseUs';
import TrustClient from '../components/TrustClient';
import ContactQuoteSection from '../components/ContactQuoteSection';
import FAQ from '../components/FAQ';
import Blog from '../components/Blog';

export default function Home() {
  return (
    <div>
      {/* 🔹 SEO Meta Tags */}
      <Helmet>
        <title>THES Group | Official Website</title>
        <meta 
          name="description" 
          content="Welcome to THES Group official website. Discover our premium properties, read client reviews, explore FAQs, and learn why you should choose us." 
        />
        <meta 
          name="keywords" 
          content="THES Group, real estate, properties, blogs, client reviews, FAQ, about company" 
        />

        {/* Open Graph (for better previews on Google, Facebook, LinkedIn) */}
        <meta property="og:title" content="THES Group Official Website" />
        <meta property="og:description" content="Explore THES Group's properties, services, blogs, and trusted client reviews." />
        <link rel="canonical" href="https://thesrgroupofficial.in/" />
        <meta property="og:url" content="https://thesrgroupofficial.in/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://thesrgroupofficial.in/SR_logo.png
" /> 
        {/* apna logo ya hero image ka link yaha lagao */}
      </Helmet>

      {/* 🔹 Page Components */}
      <TrustClient/>
      <AboutCompany />
      <FeatureSR/>
      <PropertyList />
      <ChooseUs/>
      <Blog/>
      <ClientReviews />
      <ContactQuoteSection/>
      <FAQ/>
    </div>
  );
}
