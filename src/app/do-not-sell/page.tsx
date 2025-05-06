import React from 'react';

const PrivacySection = () => {
  return (
    <section className="bg-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Do Not Sell My Personal Information</h1>
        
        <p className="text-gray-700 mb-4">
          As a California resident, you have the right under the California Consumer Privacy Act of 2018 (“CCPA”) to opt-out of the sale of your personal information. Whereas we do not sell any personal information in return for money, we and our partners collect certain pieces of personal information to deliver interest-based advertising. Please review our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>{" "}
          for a more detailed description of how we collect, use, and share the personal information of California residents, your privacy rights as a California resident and how to exercise them.
        </p>

        <p className="text-gray-700 mb-4">
          California consumers who wish to opt out of the sale of their personal information must complete one of the following options:
        </p>

        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            Submit a “Do Not Sell My Personal Information” request to us by emailing at{" "}
            <a href="mailto:support@plantin.xyz" className="text-blue-500 hover:underline">
              support@plantin.xyz
            </a>.
          </li>
          <li>
            Open Consent Management Platform and press the “Do not sell my personal information” button.
          </li>
        </ul>

        <p className="text-gray-700 mb-4">
          In effect, this will disable targeted advertising provided by our third-party partners, which means that we will no longer share your personal information with third-party partners to customize your advertising experience. Note that we may still deliver advertising to you that is not tailored to you based on your personal information, and that we may still use your personal information for other purposes such as analytics, measurement and attribution. Also, we may continue to share your personal information if the transfers are not considered “sales” under the CCPA, for example when we send information to our service providers.
        </p>

        <p className="text-gray-700 mb-4">
          Please note that your cookie preferences are domain- and browser-specific. This means that if you visit our other domains, or replace or upgrade your browser, or use another browser (or device), you may need to opt-out again from that domain or browser.
        </p>

        <p className="text-gray-700">
          If you have any other questions or requests, please email us at{" "}
          <a href="mailto:support@plantin.xyz" className="text-blue-500 hover:underline">
            support@plantin.xyz
          </a>.
        </p>
      </div>
    </section>
  );
};

export default PrivacySection;
