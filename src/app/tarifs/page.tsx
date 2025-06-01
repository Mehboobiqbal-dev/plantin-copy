// src/app/page.tsx
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import WhyChooseUs from "../components/WhyChooseUs";
import ServicesIncluded from "../components/ServicesIncluded";
import ContactCTA from "../components/ContactCTA";
// Import PricingSection if you want it on the homepage too
// import PricingSection from "./(components)/PricingSection";


export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutUs />
      <WhyChooseUs />
      <ServicesIncluded />
      {/* <PricingSection />  // Uncomment if you want pricing on the homepage */}
      <ContactCTA />
    </>
  );
}