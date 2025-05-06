import React from 'react';
import { FaInstagram, FaFacebookF, FaPinterestP, FaTiktok } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-white text-gray-800">
      
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        
        <div className="space-y-4">
          
          <div className="flex items-center space-x-2">
            <img src="https://myplantin.com/_next/static/media/logo.3707044a.svg" alt="PlantIn logo" className="h-8 w-8" />
            <span className="text-xl font-bold">PlantIn</span>
          </div>
          <p className="text-sm leading-relaxed">
            Our plant identifier with database of more than 17,000 species is also the
            best place to Ask the Botanist, get plant watering recommendations, adjust
            your plant care schedule, try disease identification, and much more!
          </p>
          <address className="not-italic text-sm">
            Florinis 7, Greg Tower,<br />
            2nd Floor, 1065,<br />
            Nicosia, Cyprus
          </address>
        </div>

        
        <div className="space-y-3">
          <h3 className="font-semibold">Plants Care</h3>
          <ul className="space-y-1 text-sm">
            {['Plant Identifier', 'Plant Problems', 'Blog', 'Ask the botanist', 'Weed community'].map(item => (
              <li key={item}>
                <a href="#" className="hover:underline">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        
        <div className="space-y-3">
          <h3 className="font-semibold">Company</h3>
          <ul className="space-y-1 text-sm">
            {['About us', 'PlantIn App review', 'Ratings and reviews', 'Hero of Ukraine', 'FAQ', 'Contact us', 'Subscription'].map(item => (
              <li key={item}>
                <a href="#" className="hover:underline">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        
        <div className="space-y-3">
  <h3 className="font-semibold">Terms and conditions</h3>
  <ul className="space-y-1 text-sm">
    {[
      { name: 'Terms of Service', link: '/terms-of-service' },
      { name: 'Money Back Policy', link: '/money-back-policy' },
      { name: 'Subscription Policy', link: '/subscription-policy' },
      { name: 'Privacy Policy', link: '/privacy-policy' },
      { name: 'Cookie Settings', link: '/cookie-settings' },
      { name: 'Do not sell my personal data', link: '/do-not-sell' },
    ].map(item => (
      <li key={item.name}>
        <a href={item.link} className="hover:underline">
          {item.name}
        </a>
      </li>
    ))}
  </ul>
</div>

        
        <div className="space-y-4">
          <h3 className="font-semibold">Get our app</h3>
          <div className="space-y-2">
            <a href="#">
              <img src="data:image/png;base64,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" className="h-10" />
            </a>
            <a href="#">
              <img src="data:image/png;base64,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" alt="Get it on Google Play" className="h-10" />
            </a>
          </div>
          <div className="flex space-x-4 mt-4 text-2xl">
            <a href="#" aria-label="Instagram" className="hover:text-green-600"><FaInstagram /></a>
            <a href="#" aria-label="Facebook" className="hover:text-green-600"><FaFacebookF /></a>
            <a href="#" aria-label="Pinterest" className="hover:text-green-600"><FaPinterestP /></a>
            <a href="#" aria-label="TikTok" className="hover:text-green-600"><FaTiktok /></a>
          </div>
        </div>
      </div>

      
      <div className="bg-green-100">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
            Identify, get care &amp; grow healthy plants with ease!
          </h2>
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-green-400 to-green-500 text-white font-medium rounded-full px-6 py-3 hover:opacity-90 transition"
          >
            Get access
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;