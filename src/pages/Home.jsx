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

