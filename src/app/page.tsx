import HeroWith3DGif from "./components/HeroWith3DGif";
import AboutUs from "./components/AboutUs";
import WhyChooseUs from "./components/WhyChooseUs";
import ServicesIncluded from "./components/ServicesIncluded";
import ContactCTA from "./components/ContactCTA";
import PricingSection from "./components/PricingSection";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <>
      <HeroWith3DGif />
      <AboutUs />
      <WhyChooseUs />
      <ServicesIncluded />
      <PricingSection />
      <Gallery />
      <ContactCTA />
      <Footer />
    </>
  );
}